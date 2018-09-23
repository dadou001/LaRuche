#!/bin/sh

# list of all anstype files
anslist=`ls $1/*.input`

# extract the anstype name and search for options
varanscheckopt=''
varansstropt=''
for ansf in $anslist
do
  anstype0=`echo $ansf | awk -F "/" '{print $NF}' - | awk -F "\." '{print $1}' -`
  ansopt0=`grep "option:" $1/$anstype0 | awk '{gsub(/option:/,""); print;}' - | awk '{gsub(/" "/,"\"-\""); print;}' - `
  anscheckopt="['noanalyze'"
  ansstropt='['
  for opt in $ansopt0
  do
    opt0=`echo $opt | awk -F "/" '{gsub(/="-"/,""); print;}' -`
    if [ $opt == $opt0 ]; then
      anscheckopt="$anscheckopt,'$opt'"
    else
      if [ $ansstropt == '[' ]; then
        ansstropt="['$opt0'"
      else
        ansstropt="$ansstropt,'$opt0'"
      fi
    fi
  done
  if [ -z "$varanscheckopt"]; then
    varanscheckopt="\n$anstype0: $anscheckopt]"
    varansstropt="\n$anstype0: $ansstropt]"
  else
    varanscheckopt="$varanscheckopt,\n$anstype0: $anscheckopt]"
    varansstropt="$varansstropt,\n$anstype0: $ansstropt]"
  fi
done
echo "var list_answer_check = {$varanscheckopt\n}"
echo "====================================="
echo "var list_answer_str = {$varansstropt\n}"
