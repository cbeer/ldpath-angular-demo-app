FROM phusion/passenger-full

ENV HOME /home/app/webapp

RUN rm -f /etc/service/nginx/down
RUN rm /etc/nginx/sites-enabled/default
RUN rm -f /etc/service/memcached/down

ADD webapp.conf /etc/nginx/sites-enabled/default
ADD secret_key.conf /etc/nginx/main.d/secret_key.conf

RUN mkdir /home/app/webapp
ADD . /home/app/webapp

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

CMD ["/sbin/my_init"]
