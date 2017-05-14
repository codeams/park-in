<template lang='html'>
  <div class='map'>
    <div class='container'>

      <div class='row justify-content-center'>
        <div class='col-md-4'>
          <div class='map--card text-center'>
          <form>
          <div class='form-group'>
            <input type='text' class='form-control' id='destination' placeholder='Catedral, Merida Centro'>
          </div>
          <a class='btn btn-primary btn-main' href='reserve.php'>Reservar lugar</a>
        </form>
        </div>
        </div>
      </div>

      <div class='row'>
        <div class='col-md-12 map--container'>
            <div id='map'></div>
        </div>
      </div>

      <reserve v-if='showReserve' :features='parkFeatures'></reserve>

    </div>
  </div>
</template>

<script>
  import Firebase from 'firebase'
  import { mapGetters, mapActions } from 'vuex'

  import Reserve from '@/components/Reserve'

  export default {
    name: 'Map',

    data () {
      return {
        database: Firebase.database(),
        showReserve: false,
        parkFeatures: {}
      }
    },

    created () {
      setTimeout(() => {
        this.updateMap()
      }, 5000)

      this.setParksRef(this.database.ref('parks'))
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
          zoom: 15,
          center: {
            lat: 20.974799,
            lng: -89.621127
          }
        })

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
            infowindow.open(map, this)
            let features = _vue.parks[location.id].features
            _vue.parkFeatures = features
            _vue.showReserve = true
          })

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
    padding-top: 10%;
    padding-right: 15px;
    padding-left: 15px;
    height: 30vh;
}

.map--container
{
    height: 70vh;
    padding: 0;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
