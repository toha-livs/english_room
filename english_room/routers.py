from rest_framework import routers
from study.viewsets import RelationWordViewSet


router = routers.DefaultRouter()
router.register(r'relation', RelationWordViewSet)