from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import stockSerializer

from .models import Stocks
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/stock-list/',
		'Detail View':'/stock-detail/<str:pk>/',
		'Create':'/stock-create/',
		'Update':'/stock-update/<str:pk>/',
		'Delete':'/stock-delete/<str:pk>/',
		}

	return Response(api_urls)

@api_view(['GET'])
def stockList(request):
	stock = Stocks.objects.all().order_by('-id')
	serializer = stockSerializer(stock, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def stockDetail(request, pk):
	stock = Stocks.objects.get(id=pk)
	serializer = stockSerializer(stock, many=False)
	return Response(serializer.data)


@api_view(['POST'])
def stockCreate(request):
	serializer = stockSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['POST'])
def stockUpdate(request, pk):
	stock = Stocks.objects.get(id=pk)
	serializer = stockSerializer(instance=stock, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['DELETE'])
def stockDelete(request, pk):
	stock = Stocks.objects.get(id=pk)
	stock.delete()

	return Response('Item succsesfully delete!')



