function change_onglet(name) {
	document.getElementById('Rid_Tab_Onglet_'+anc_onglet).className = 'Rcl_Tab_Onglet_0 Rcl_Tab_Onglet';
	document.getElementById('Rid_Tab_Onglet_'+name).className = 'Rcl_Tab_Onglet_1 Rcl_Tab_Onglet';
	document.getElementById('Rid_Contenu_Onglet_'+anc_onglet).style.display = 'none';
	document.getElementById('Rid_Contenu_Onglet_'+name).style.display = 'block';
	anc_onglet = name;
}