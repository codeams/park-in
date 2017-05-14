<template lang='html'>
  <div class='map'>
    <div class='container-fluid'>

      <div class='row'>
        <div class='map--card text-center'>
          <div class='col-sm-7 col-sm-offset-1'>

          <div class='form-group'>
            <input v-model='location' type='text' @keyup.enter='updateMap()' class='form-control' id='destination' placeholder='A donde vas?'>
          </div>
        </div>
        <div class="col-sm-4 text-center">
          <a class='btn btn-primary btn-main' @click='updateMap()'>Buscar Lugar</a></div>
        </div>

      </div>

      <div class='row'>
        <div class='col-sm-12 map--container'>
          <div id='map' style="height:650px"></div>
        </div>

      </div>

      <transition name='fade'>
        <reserve v-if='showReserve' :features='parkFeatures' :reserved='reserved'></reserve>
      </transition>

    </div>
  </div>
</template>

<script>
  import markerBlue from '@/assets/marker_blue.png'
  import markerPurple from '@/assets/marker_purple.png'
  import Bus from '@/Bus'

  import Firebase from 'firebase'
  import { mapGetters, mapActions } from 'vuex'

  import Reserve from '@/components/Reserve'

  export default {
    name: 'Map',

    data () {
      return {
        database: Firebase.database(),
        showReserve: false,
        parkFeatures: {},
        reserved: false,
        location: ''
      }
    },

    created () {
      this.setParksRef(this.database.ref('parks'))

      Bus.$on('closeReserve', () => {
        this.showReserve = false
        this.parkFeatures = {}
      })

      Bus.$on('reserve', (id) => {
        let val = !this.parks[id].reserved

        this.database.ref(`parks/${id}/reserved`).set(val)
          .then(() => {
            this.showReserve = false
          }).catch((response) => {
            console.error(response)
          })
      })

      Bus.$on('closeReserve', () => {
        this.showReserve = false
      })
    },

    computed: {
      ...mapGetters([
        'parks'
      ])
    },

    watch: {
      parks () {
        this.updateMap()
      }
    },

    methods: {
      centerMap (map) {
        let geocoder = new google.maps.Geocoder() // eslint-disable-line
        if (this.location !== '') {
          geocoder.geocode({ 'address': this.location }, function (results, status) {
            if (status === 'OK') {
              map.setCenter(results[0].geometry.location)
            }
          })
        }
      },

      updateMap () {
        let locations = []

        for (let key in this.parks) {
          if (key === '.key') continue
          let park = this.parks[key]

          if (park.slots.used > 0) continue

          locations.push({
            lat: park.geolocation.lat,
            lng: park.geolocation.lng,
            id: key
          })
        }

        if (typeof this.$options.components['Map'] === 'undefined') return
        else this.initMap(locations)
      },

      initMap (locations) {
        let theMap = $('#map')[0] // eslint-disable-line

        let map = new google.maps.Map(theMap, { // eslint-disable-line
          zoom: 18,
          center: {
            lat: 20.974799,
            lng: -89.621127
          }
        })
        this.centerMap(map)

        // Create an array of alphabetical characters used to label the markers.
        // let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        // Initializing infowindow to show details
        let infowindow = new google.maps.InfoWindow({}) // eslint-disable-line

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        locations.map((location, i) => {
          // Creating markers
          let marker = new google.maps.Marker({ // eslint-disable-line
            position: location
          })
          // Adding listener to marker on click event
          let _vue = this
          marker.addListener('click', function () {
            // infowindow.open(map, this)
            let features = _vue.parks[location.id].features
            _vue.parkFeatures = { id: location.id, ...features }
            _vue.showReserve = true
            _vue.reserved = _vue.parks[location.id].reserved
          })
          if (this.parks[location.id].reserved === true) {
            marker.setIcon(markerPurple)
          } else {
            marker.setIcon(markerBlue)
          }
          marker.setMap(map)
        })
      },

      ...mapActions([
        'setParksRef'
      ])
    },

    components: {
      Reserve
    }
  }
</script>

<style>
.map--card
{
    padding-top: 25px;
    padding-right: 15px;
    padding-left: 15px;

}
.map--card form {
  padding-bottom: 15px;
}

.btn{
  margin-bottom: 15px;
  z-index: 100;
  position: relative;
}

.map--container
{
    height: 70vh;
    padding: 0;
}

#map {
  width: 100%;
  margin-top: -25px;
  height: 650px;
}

.form-control {
  background-color: white;
  color: #196eef;
}
</style>
