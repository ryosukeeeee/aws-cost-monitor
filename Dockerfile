FROM amazonlinux:latest

RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash - && \
    yum install -y nodejs zip && \
    npm install -g yarn && \
    mkdir /test
    
COPY ./package.json /test/
COPY ./yarn.lock /test/

WORKDIR /test

ENTRYPOINT ["yarn"]
CMD ["install"]