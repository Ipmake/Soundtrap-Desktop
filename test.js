new Promise((resolve, reject) => {
    (() => {
      var img = document.getElementsByClassName("MiniPlayerPoster-card-y4FtsU MetadataPosterCard-card-NZOemZ")[0].innerHTML
      img = img.split("url(")[1]
      img = img.split(")")[0]

      img = img.replace(/&quot;/g, '')

        var image = new Image();
        image.src = img;
        image.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
            canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

            canvas.getContext("2d").drawImage(this, 0, 0);

            // Get raw image data
            // callback(canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, ""));

            // ... or get as Data URI
            resolve(canvas.toDataURL("image/png"));
        }
    })()
  })