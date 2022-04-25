#!/bin/bash

docker run -d --name sentiment_analysis tensorflow/serving

docker cp ${PWD}/apps/sentiment-model sentiment_analysis:/models/sentiment_analysis

docker commit --change "ENV MODEL_NAME sentiment_analysis" sentiment_analysis \
  $USER/sentiment_analysis

docker run -p 8500:8500 -t $USER/sentiment_analysis &