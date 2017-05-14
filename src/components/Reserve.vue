<template lang='html'>
  <div class="reserve">
    <div class="container">

      <div class="row justify-content-center">
        <div class="col-md-4">
          <!--section-->
          <div class="reserve--card text-center">
            <h1>PARK ME</h1>
            <div class="reserve--title">
              <h3>{{ features.address }}</h3>
              <h3>{{ features.schedule }}</h3>
            </div>
          <form>
            <div class="form-group">
              <h1>${{ features.price }}.00 MXN</h1>
              <p>costo por hora</p>
            </div>
          </form>
        </div>

        </div>
      </div>
      <div class="reserve--characteristics row">
        <div class="col-xs-4 text-center">
          <i class="fa fa-wheelchair" aria-hidden="true"></i>
          <p>
            Dirlaskdmaslk
          </p>
        </div>
        <div class="col-xs-4 text-center">
          <i class="fa fa-video-camera" aria-hidden="true"></i>
          <p>
            Lorem ipsum dolor sit ame
          </p>
        </div>
        <div class="col-xs-4 text-center">
          <i class="fa fa-columns" aria-hidden="true"></i>
          <p>
            Lorem ipsum dolor sit ame
          </p>
        </div>
      </div>

      <div class="row text-center buttons">
        <div class="col-sm-12 map--container">
          <form>
            <button @click.prevent='emitReserve()'
              :class='{
                "btn": true,
                "btn-primary": reserved ? false : true,
                "btn-warning": reserved ? true : false,
                "btn-main": true
                }'>
              {{ this.reserved ? 'Cancelar reserva' : 'Reservar'  }}
            </button>
            <button @click.prevent='emitCloseReserve()'
              class="btn btn-secondary btn-main">
              Regresar
            </button>
          </form>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import Bus from '@/Bus'

  export default {
    name: 'Reserve',

    props: [
      'features',
      'reserved'
    ],

    data () {
      return {}
    },

    methods: {
      emitReserve () {
        Bus.$emit('reserve', this.features.id)
      },

      emitCloseReserve () {
        Bus.$emit('closeReserve')
      }
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
  z-index: 1001;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 25px;
  border: 10px solid #0c1531;

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
