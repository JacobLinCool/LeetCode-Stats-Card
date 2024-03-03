FROM jacoblincool/workerd:latest

COPY ./worker.capnp ./worker.capnp

CMD ["serve", "--experimental", "--binary", "worker.capnp"]