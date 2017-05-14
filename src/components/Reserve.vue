<template lang='html'>
  <div class="reserve">
    <div class="container">

      <div class="row justify-content-center">
        <div class="col-md-4">
          <!--section-->
          <div class="reserve--card text-center">
            <h1>parkme</h1>
            <div class="reserve--title">
              <h5>Estacionamiento en {{ features.address }}</h5>
              <h5>Horario: {{ features.schedule }}</h5>
            </div>
          <form>
          <div class="form-group">
            <h1>${{ features.price }} mxn</h1>
            <p>
              costo por hora
            </p>
          </div>
        </form>
        </div>

        </div>
      </div>
      <div class="reserve--characteristics row">
        <div class="col-4 text-center">
          <i class="fa fa-wheelchair" aria-hidden="true"></i>
          <p>
            Dirlaskdmaslk
          </p>
        </div>
        <div class="col-4 text-center">
          <i class="fa fa-video-camera" aria-hidden="true"></i>
          <p>
            Lorem ipsum dolor sit ame
          </p>
        </div>
        <div class="col-4 text-center">
          <i class="fa fa-columns" aria-hidden="true"></i>
          <p>
            Lorem ipsum dolor sit ame
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 map--container">
          <form>
          <a class="btn btn-primary btn-main" href="ticket.php">Reservar lugar</a>
        </form>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'Reserve',

    props: [
      'features'
    ],

    data () {
      return {}
    }
  }
</script>

<style>
.reserve--card
{
  padding: 15px;
  padding-bottom: 50px;
}
.reserve
{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 20px;
  padding: 25px;

  color: black;
  background-color: white;
}
.reserve--characteristics .fa
{
  font-size: 25px;
}
.reserve--title
{
  padding-top: 15px;
}
.ticket--info
{
  font-size: 10px;

  text-align: center;
}
</style>
