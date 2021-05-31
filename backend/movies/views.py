from django.shortcuts import get_object_or_404
from django.conf import settings
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from .models import Movie
from .serializers import MovieSerializer, MovieRandomSerializer

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .models import Movie, Genre
from .serializers import MovieSerializer, GenreSerializer

# user 모델 가져오기
from django.contrib.auth import get_user_model

# Create your views here.
# 인기순으로 영화 제목 보내기 (selectBox)
@api_view(['GET', 'POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def home(request):
    if request.method == 'GET':
        movies = Movie.objects.order_by('-popularity')[:50]
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# 영화 상세 데이터
@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)

# tinder에 보낼 랜덤 영화
@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def random(request):
    movies = Movie.objects.order_by('?')[:200]
    serializer = MovieRandomSerializer(movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# GET : genre 데이터를 리턴
# POST : tinder로 받아온 선호 장르 입력
@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def genres(request):
    if request.method == 'GET':
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        person = get_object_or_404(get_user_model(), username=request.user)
        # 여기서 데이터를 하나만 보내야 함!
        for data in request.data:
            person.like_genres.add(data)
        return Response(status=status.HTTP_201_CREATED)

# 장르 데이터를 기반으로 영화 추천
@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def recommend(request):
    person = get_object_or_404(get_user_model(), username=request.user)
    genres = person.like_genres.all()

    genres_dict = {'12': 0, '14': 0, '16': 0, '18': 0, '27': 0, '28': 0, '35': 0, '36': 0, '37': 0, '53':0, '80': 0, '99':0, '878':0, '9648':0, '10402':0, '10749':0, '10751':0, '10752':0, '10770':0 }

    for genre in genres:
        genres_dict[str(genre.id)] += 1

    max_val = 0
    best_genre = ''
    for key, val in genres_dict.items():
        if max_val < val:
            best_genre = key
            max_val = val

    movies = Movie.objects.order_by('?')[:1000]
    recommend_movies = []

    cnt = 0
    for movie in movies:
        if cnt >= 200:
            break
        if int(best_genre) in [x.id for x in movie.genre_ids.all()]:
            recommend_movies.append(movie)
            cnt += 1
            continue

    best_genre = get_object_or_404(Genre, pk=int(best_genre))

    serializer = MovieSerializer(recommend_movies[:50], many=True)
    return JsonResponse({'data': serializer.data, 'best_genre': best_genre.name }, status=status.HTTP_200_OK)
