#!/usr/bin/python
#-*- coding: UTF-8 -*- 
#coding=utf-8

import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )

from django.shortcuts import render
from django.http import HttpResponse
from urllib import urlencode, quote, unquote

import json
import urllib2

from rest_framework.decorators import(
	api_view,
	permission_classes,
	parser_classes,
)
from rest_framework.permissions import(
	AllowAny,
	IsAuthenticated
)
from rest_framework.response import Response
from django.shortcuts import render,render_to_response

def fanyi(request):

    return render(request,'fanyi.html')


@api_view(['GET'])
@permission_classes([AllowAny])
def youdao(request):

    word = request.GET.get('word',None)
    print word    
    if word is  not None:
        query = {
            'q':word
	}	

        url = 'http://fanyi.youdao.com/openapi.do?keyfrom=11pegasus11&key=273646050&type=data&doctype=json&version=1.1&' + urlencode(query)
    	req = urllib2.Request(url)
    	response = urllib2.urlopen(req)
    	result = response.read().decode('utf-8')

	json_result = json.loads(result)

	return Response(json_result)

    else:
	return Response('输入要查询的词汇')


@api_view(['GET'])
@permission_classes([AllowAny])

def Api(request):

    pass
