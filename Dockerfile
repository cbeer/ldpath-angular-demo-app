FROM phusion/passenger-ruby22

ENV HOME /home/app/webapp

RUN rm -f /etc/service/nginx/down
RUN rm /etc/nginx/sites-enabled/default
RUN rm -f /etc/service/memcached/down

ADD webapp.conf /etc/nginx/sites-enabled/default
ADD secret_key.conf /etc/nginx/main.d/secret_key.conf

WORKDIR /home/app/webapp

ADD . /home/app/webapp

RUN bundle install --deployment
RUN SECRET_KEY_BASE=x rake assets:precompile
RUN chown app -R /home/app/webapp/log /home/app/webapp/db
RUN chmod u+wr -R /home/app/webapp/log /home/app/webapp/db


RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

CMD ["/sbin/my_init"]
