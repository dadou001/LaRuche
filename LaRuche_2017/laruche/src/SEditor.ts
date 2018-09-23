class SEditor{
  //attributs
  // Un editeur quill
  public editor:any;

  //Constructeur
  constructor(editor:any){
    this.editor = editor;
  }

  public to_variable_value(){
    var res = this.to_OEFcode().split('<p>').join("").split('</p>').join("");
    return res.substring(0,res.length-1);
  }
  public to_Blockly_Analyse(){
    var tmp = this.to_variable_value();
    var start = tmp.search('\\embed{');
    var result = '';
    var end;
    var vir;
    while(start != -1){
      result += tmp.substring(0,start-1);
      tmp = tmp.substring(start);
      end = tmp.search('}');
      vir = tmp.search(',');
      result += '\\'+tmp.substring(6,vir);
      tmp = tmp.substring(end+1);
      start = tmp.search('\\embed{');
    }
    result += tmp;
    return result;
  }
  public to_OEFcode(){
    var content = this.editor.getContents();
    var tabContent = content['ops']; //on obtient notre tableau de contenu
  	var line = ""; //on intialise notre ligne courante
  	var tabTmp = []; //on initialise notre tableau temporaire (celui qui découpe sur les retours chariots)
  	var result = ""; //On initialise notre résultat final
  	var resTmp; //on initialise notre résultat temporaire
    var was_variable = false; //On regarde si la valeur précédente était une variable ou pas
    var answer_count = {'value':1};
  	var was_list = {'ordered':false,'unordered':false}; //On initialise notre tableau pour savoir si une liste est active ou non
  	for (var i = 0;i<tabContent.length;i++){
  		tabTmp = this.cut_insert(tabContent[i]); //on découpe le contenu de la case i du tableau
  		for(var j = 0;j<tabTmp.length;j++){
  			if(tabTmp[j]['insert'] != "\n"){ //Si on arrive pas sur une fin de ligne, on ajoute les élements à la ligne
  				line += this.add_element_line(tabTmp[j],answer_count,was_variable);
          was_variable = (tabTmp[j]['insert']['VariableImage'] != null);
  			}
  			else{
  				//Sinon on applique les bons attributs à la ligne
  				resTmp = this.applied_attributes(line,tabTmp[j],was_list);
  				//on met à jour nos informations
  				was_list = resTmp['was_list'];
  				result += resTmp['line'];
  				line = "";
  			}
  		}
  	}
  	if (line != ""){
  		result += line;
  	}
  	return this.clean_OEFcode(result);
  }

  public add_variable(nameVar){
  	this.editor.focus(); //On regarde l'editeur
  	var selection = this.editor.getSelection(); //on obtient l'index de la selection de l'utilisateur
  	insert_embed_object(this.editor,selection.index,'VariableImage',nameVar); //On insere une imageVariable à cet endroit
  }

  public add_answer(nameAns){
  	this.editor.focus(); //On regarde l'editeur
  	var selection = this.editor.getSelection(); //on obtient l'index de la selection de l'utilisateur
  	insert_embed_object(this.editor,selection.index,'answerImage',nameAns,this.editor.container.id);
  }

  public destroy_var(varName){
  	var content = this.editor.getContents(); //On obtient le delta de l'éditeur
  	var tab = content['ops']; //On récupère le tableau d'insert
  	var tabRes = []; //On initialise notre tableau de résultat final que l'on enverra à l'éditeur
  	for (var i = 0;i<content['ops'].length;i++){
  		if ((content['ops'][i]['insert']['VariableImage'] == null) || (content['ops'][i]['insert']['VariableImage'] != varName)){
  			tabRes.push(content['ops'][i]); //On prend toutes les valeurs qui ne sont pas notre variable
  		}
  	}
  	content['ops'] = tabRes; //On recrée un 'content' cohérent
  	this.editor.setContents(content);
  }

  public destroy_answer(ansName){
  	var content = this.editor.getContents(); //On obtient le delta de l'éditeur
  	var tab = content['ops']; //On récupère le tableau d'insert
  	var tabRes = []; //On initialise notre tableau de résultat final que l'on enverra à l'éditeur
  	for (var i = 0;i<content['ops'].length;i++){
  		if ( (content['ops'][i]['insert']['answerImage'] == null) ||
            (AnswerImage.nameFromObject(content['ops'][i]['insert']['answerImage']) != ansName) ){
  			tabRes.push(content['ops'][i]); //On prend toutes les valeurs qui ne sont pas notre réponse
  		}
  	}
  	content['ops'] = tabRes; //On recrée un 'content' cohérent
  	this.editor.setContents(content);
  }

  public change_to_latex(){
  	var positionSelection = this.editor.getSelection(); //On obtient la sélection de l'utilisateur
  	if (positionSelection.length == 0){
  		if(this.editor.getFormat()['LatexImage'] == true){
  			this.editor.format('LatexImage',false);
  		}
  		else{
  			this.editor.format('LatexImage',true);
  		}
  	}
  	else{
  		if(this.editor.getFormat()['LatexImage'] == true){
  			this.editor.formatText(positionSelection.index,positionSelection.length,'LatexImage',false);
  		}
  		else{
  			this.editor.formatText(positionSelection.index,positionSelection.length,'LatexImage',true);
  		}
  	}
  }

  public getContents(){
    return this.editor.getContents();
  }
  // public count_answer(){
  //   var content = this.editor.getContents()['ops'];
  //   var counter = 0;
  //   for(var i = 0;i<content.length;i++){
  //     if(content[i]['insert']['answerImage'] != null){
  //       counter += 1;
  //     }
  //   }
  //   return counter;
  // }

  public changeNameVar(oldname,newName){
    var content = this.editor.getContents()['ops'];
    var result = [];
    for(var i = 0;i<content.length;i++){
      if(content[i]['insert']['VariableImage']){
        if(content[i]['insert']['VariableImage'] == oldname){
          result.push({'insert':{'VariableImage':newName}});
        }
        else{
          result.push(content[i]);
        }
      }
      else{
        result.push(content[i]);
      }
    }
    var tmp = {'ops':result}
    this.editor.setContents(tmp);
  }

  public get_answer_tab(){
    var cont = this.editor.getContents()['ops'];
    var result = [];
    for(var i = 0;i<cont.length;i++){
      if(cont[i]['insert']['answerImage'] != null){
        result.push(AnswerImage.nameFromObject(cont[i]['insert']['answerImage']));
      }
    }
    return result;
  }

  public focus(){
    this.editor.focus();
  }



  // public add_answer(var_list){
  // 	//AJOUTER A LA LISTE DE VARIABLES AUSSI
  // 	this.editor.focus();
  // 	var positionSelection = this.editor.getSelection(); //On obtient la sélection de l'utilisateur
  // 	if (positionSelection.length == 0){
  // 		//Ajouter un popup pour créer directement la variable
  // 	}
  // 	else{
  // 		var nameVar = this.editor.getText(positionSelection.index,positionSelection.length); //On récupère le contenu de la séléction
  // 		if (test_valid_expression(nameVar)){
  // 			this.editor.deleteText(positionSelection.index,positionSelection.length); //On enlève le texte séléctionné
  // 			editor.insertEmbed(positionSelection.index, 'answerImage',nameVar); //On le remplace par Variable possédant le nom que l'utilisateur avait sélectionné
  // 			if (var_list[nameVar] == null){
  // 				var_list[nameVar] = new Variable(nameVar,"answer");
  // 				//Faire ça après, le sortir de l'éditeur
  // 				update_variables_view("card_Enonce_Variable",var_list);
  // 			}
  // 		}
  // 	}
  // }

  private cut_insert(delta_element){
    if(typeof delta_element['insert'] === "string"){
    	var text = delta_element['insert']; //on obtien de le contenu textuel de l'élement
    	var return_line_search = text.search("\n"); //on initialise la position du premier retour chariot
    	var result = [];//on initialise notre résultat
    	while (return_line_search != -1){
    		//On ajoute le contenu jusqu'au retour chariot avec les mêmes attributs
    		result.push({'insert':text.substring(0,return_line_search),'attributes':delta_element['attributes']});
    		//on ajoute un retour chariot seul
    		result.push({'insert':"\n",'attributes':{}});
    		//On obtient la suite du texte
    		text = text.substring(return_line_search+1);
    		//on cherche le prochain retour chariot
    		return_line_search = text.search("\n");
    	}
    	if(text.length>0){
    		//S'il reste des choses à traiter on l'ajoute au résultat
    		result.push({'insert':text,'attributes':delta_element['attributes']});
    	}
    	if(delta_element['insert'] == "\n"){
    		//si l'élément était un retour chariot à la base, on le laisse tel quel
    		result = [delta_element];
    	}
    	return result;
    }
    else{
      return [delta_element];
    }
  }

  private add_element_line(element,count_answer,was_variable){
  	var result = element['insert']; //on initialise notre résultat
  	if (element['insert']['VariableImage']!= null){
  		//si c'est une variable on la traite avec un \ devant
  		result = "\\"+element['insert']['VariableImage'];
  	}
    else if (element['insert']['answerImage']!= null){
  		//si c'est une answer on la traite avec un <answer> devant
  		result = "\\embed{reply"+count_answer['value']+","+answer_List[AnswerImage.nameFromObject(element['insert']['answerImage'])].length+"}";
      count_answer['value']++;
  	}
    else if (element['insert']['image']!= null){
  		//si c'est une image on la traite
  		result = "<img src=\""+element['insert']['image']+"\">";
  	}
  	else if (element['attributes'] != null) {
  		if(element['attributes']['LatexImage'] != null){
  			//Si c'est du latex, on le traite en premier pour ne pas le polluer avec des balises
  			result = "\\("+result+"\\)"
  		}
  		for (var key in element['attributes']){
  			//On ajoute les bonnes balises autour du texte selon les attributs
  			switch(key){
  				case 'bold':
  					result = "<strong>"+result+"</strong>"
  					break;
  				case 'italic':
  					result = "<em>"+result+"</em>"
  					break;
  				case 'underline':
  					result = "<u>"+result+"</u>"
  					break;
  				case 'strike':
  					result = "<s>"+result+"</s>"
  					break;
          case 'script':
            if(element['attributes']['script'] == 'sub'){
              result = '<sub>'+result+'</sub>';
            }
            else if(element['attributes']['script'] == 'super'){
              result = '<sup>'+result+'</sup>';
            }
            break;
          case 'link':
            var lien = element['attributes']['link'];
            result = '<a href="'+lien+'">'+result+'</a>';
            break;
          case 'indent':
            var maClass = element['attributes']['indent'];
            result = '<span class="wims_indent_'+maClass+'">'+result+'</span>';
            break;
          case 'size':
            if(element['attributes']['size'] == 'small'){
              result = '<span style="font-size:0.75em;">'+result+'</span>';
            }
            else if(element['attributes']['size'] == 'large'){
              result = '<span style="font-size:1.25em;">'+result+'</span>';
            }
            else if(element['attributes']['size'] == 'huge'){
              result = '<span style="font-size:1.5em;">'+result+'</span>';
            }
            break;
  			}
  		}
  	}
    if(was_variable && (result.length>0) && (this.isAlphaNumeric(result[0]))){
      result = ' '+result;
    }
  	return result;
  }

private isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

  private applied_attributes(line,element,was_list){
  	var attributes = element['attributes']; //on récupère les attributs
    var style = '';
    if (attributes == undefined){
      attributes = {};
    }
  	var result = line; //on initialise notre résultat avec le contenu de la ligne en cours
  	if(Object.keys(attributes).length == 0){ //S'il n'y a pas d'attributs, on entoure juste la ligne de balise <p>
  		result = "<p>"+result+"</p>\n";
  	}
  	for(var key in attributes){
  		//On regarde tous les attributs
  		switch(key){
  			case 'list':
  				if(attributes['list'] == 'bullet'){
  					if(was_list['unordered'] == false){
  						//on gèr la cas de début de liste unorderde
  						result = "<ul><li>"+result+"</li>\n";
  						was_list['unordered'] = true;
  					}
  					else{
  						//le cas d'une liste en cours
  						result = "<li>"+result+"</li>\n";
  					}
  				}
  				if(attributes['list'] == 'ordered'){
  					if(was_list['ordered'] == false){
  						//on gère le cas de début d'une liste ordered
  						result = "<ol><li>"+result+"</li>\n";
  						was_list['ordered'] = true;
  					}
  					else{
  						result = "<li>"+result+"</li>\n";
  					}
  				}
  				break;
        case 'code-block':
          result += "\n";
          break;
        case 'header':
          var bal = 'h'+attributes['header'];
          result = '<'+bal+'>'+result+'</'+bal+'>';
          break;
        case 'align':
          switch(attributes['align']){
            case 'right':
              // result = '<span style="text-align:right;">'+result+'</span>';
              style += 'text-align:right;';
              break;
            case 'left':
              // result = '<span style="text-align:left;">'+result+'</span>';
              style += 'text-align:left;';
              break;
            case 'center':
              // result = '<span style="text-align:center;">'+result+'</span>';
              style += 'text-align:center;';
              break;
            case 'justify':
              // result = '<span style="text-align:justify;">'+result+'</span>';
              style += 'text-align:justify;';
              break;
          }
          break;
  		}
  	}
  	if (attributes['list'] == null){
  		//on cherche à voir s'il faut fermer les listes ou non
  		if(was_list['ordered']){
  			result ="</ol>\n"+result;
  			was_list['ordered'] = false;
  		}
  		if(was_list['unordered']){
  			result ="</ul>\n"+result;
  			was_list['unordered'] = false;
  		}
  	}
  	else if(attributes['list'] == 'bullet'){
  		if(was_list['ordered']){
  			result ="</ol>"+result;
  			was_list['ordered'] = false;
  		}
  	}
  	else if(attributes['list'] == 'ordered'){
  		if(was_list['unordered']){
  			result ="</ul>"+result;
  			was_list['unordered'] = false;
  		}
  	}
    if(style != ''){
      result = '<p style="'+style+'">'+result+'</p>\n';
    }
  	return {'line':result,'was_list':was_list};
  }

  private find_balise_block(str){
  	var result = []; //on initialise notre résultat qui sera sous la forme [positionDébut,positionFin]
  	var start_balise = str.search("<"); //On initialise notre position de début de balise
  	var end_balise; //On initialise notre position de fin de balise
  	var name_balise = ""; //on initialise le nom de la balise courante (INUTILE POUR LE MOMENT)
  	var counter = 0; //On initialise notre compteur qui va nous permettre de retrouver le block de balise dans la chaine originale
  	result.push(start_balise); //On entre le début du block de balise
  	while(str[start_balise] == "<"){
      end_balise = str.substring(start_balise).search(">") + start_balise; //On va chercher ou se ferme la balise courante
  		name_balise = str.substring(start_balise+1,end_balise);//On obtient le nom de la balise (INUTILE POUR LE MOMENT)
  		counter += name_balise.length+2; //On ajoute au compteur la taille de la balise
  		str = str.substring(end_balise+1);//On récupère la suite de la chaine
  		start_balise = 0;//On regarde le premier caractère
  	}
  	result.push(result[0]+counter); //On ajoute le pointeur vers la fin de block au résultat
  	return result;
  }

  private clean_balise_block(str){
  	var result = "";
  	if(str.length>0){ //Si la chaine comprend des choses à nettoyer
  		var start_balise = 0; //On initialise la position du début de notre balise
  		var end_balise = str.search(">"); //On initialise la position de la fin de la balise courante
  		var name_balise = "";//On initialise le nom de la balise
  		var name_complement = "";//On initialise le complément du nom de la balise
  		var pos_complement; //On initialise la position de la balise complémentaire
  		while(str.length>0){ //Tant qu'il y a des caractères à traiter
  			end_balise = str.search(">"); //On va voir la fin de la balise
  			name_balise = str.substring(start_balise+1,end_balise);//On récupère le nom de la balise courante
  			//On obtient le nom du complément de la balise
        if(name_balise.substring(0,3) != 'img'){
    			if(name_balise[0] == "/"){
    				name_complement = name_balise.substring(1);
    			}
    			else{
    				name_complement = "/"+name_balise;
    			}
    			//On cherche la position de la balise complémentaire
    			pos_complement = str.search("<"+name_complement+">");
    			//Si elle n'existe pas, on ajoute la balise courant au résultat
    			if(pos_complement == -1){
    				result += "<"+name_balise+">";
    				str = str.substring(end_balise+1);//On obtient la suite de la chaine
    			}
    			else{
    				//Sinon on supprime la balise courante et la balise complémentaire dans la chaine
    				str = str.substring(name_balise.length+2,pos_complement)+str.substring(pos_complement+name_complement.length+2);
    			}
        }
        else{
          result += "<"+name_balise+">";
          str = str.substring(end_balise+1);//On obtient la suite de la chaine
        }
  		}
  	}
  	return result;
  }

  private clean_OEFcode(str){
  	var tab = this.find_balise_block(str); //On obtient la position du premier block de balises
  	var result = ""; //On initialise notre résultat
  	var balise_block = ""; //On initialise le contenu du block de balise
  	while(tab[0] != tab[1]){
  		balise_block = this.clean_balise_block(str.substring(tab[0],tab[1])); //On nettoie le block de balise
  		result += str.substring(0,tab[0]) + balise_block; //On ajoute le contenu nettoyer au résultat
  		str = str.substring(tab[1]); //On obtient la suite de la chaine
  		tab = this.find_balise_block(str); //On trouve le block suivant
  	}
  	result += str;
  	return result;
  }
}
