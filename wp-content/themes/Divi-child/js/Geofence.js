navigator.serviceWorker
  .register('sw.js')
  .then((swRegistration) => {
    let region = new CircularGeofenceRegion({
      name: 'ULarea',
      latitude: 30.2107271,
      longitude: -92.0207281,
      radius: 1000
    });
    let options = {
      includePosition: true
    };
    swRegistration.geofencing.add(region, options)
      .then(
        // If more than just a name needs to be stored with a geofence, now
        // would be the time to store this in some storage.
        (geofence) => console.log(geofence.id),
        (error) => console.log(error)
      );
  });