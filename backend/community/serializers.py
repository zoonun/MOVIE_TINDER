from rest_framework import serializers
from rest_framework.utils import model_meta
from .models import Comment, Review, Rate

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('id', 'content', 'created_at', 'updated_at')
        read_only_fields = ('review',)

class RateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rate
        fields = '__all__'
        read_only_fields = ('movie', 'user',)

class ReviewListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    # comment_set = CommentSerializer(many=True, read_only=True)
    rates = RateSerializer(many=True, read_only=True)
    rate_count = serializers.IntegerField(
        source = 'rates.count',
        read_only = True,
    )
    rate_average = serializers.SerializerMethodField('rates_avg')

    def rates_avg(self, movie):
        cnt = movie.rates.count()
        rates_sum = 0
        if cnt:
            for rate in movie.rates.all():
                rates_sum += rate.score
            result = round(rates_sum/cnt, 2)
        else:
            result = 0
        return result

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user', 'like_users',)
