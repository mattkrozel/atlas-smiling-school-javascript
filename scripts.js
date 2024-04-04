$(document).ready(function () {
    function fetchQuotes() {
      $.ajax( {
        url: "https://smileschool-api.hbtn.info/quotes", method: "GET",
        beforeSend: function () {
          $("#quotes-carousel").html('<div class="loader"></div>');
        },
        success: function (data) {
          $(".loader").remove();
          data.forEach(function (quote, index) {
            var activeClass = index === 0 ? "active" : "";
            var carouselItem = `
              <div class="carousel-item ${activeClass}">
                <div class="mx-auto row align-items-center">
                  <div class="col-12 col-sm-2 col-lg-2 text-center offset-lg-1">
                    <img src="${quote.pic_url}" class="align-self-center d-block" alt="Carousel Pic ${index + 1}">
                  </div>
                  <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                    <div class="quote-text">
                      <p class="text-white">${quote.text}</p>
                      <h4 class="text-white font-weight-bold">${quote.name}</h4>
                      <span class="text-white">${quote.title}</span>
                    </div>
                  </div>
                </div>
              </div>`;
            $("#quotes-carousel").append(carouselItem);
          });
          $(".carousel").carousel();
        },
        error: function() {
          $("#quotes-carousel").html('<div class="text-white">Failed to fetch quotes. Please try again later.</div>');
        }
      });
    }

    function fetchVideoCards() {
      $.ajax({
        url: "https://smileschool-api.hbtn.info/popular-tutorials", method: "GET",
        beforeSend: function () {
          $(".loader").show();
        },
        success: function (data) {
          $(".loader").hide();
          var chunks = [];
          for (var i = 0; i < data.length; i += 4) {
            chunks.push(data.slice(i, i + 4));
          }
          chunks.forEach(function (chunk, index) {
            var activeClass = index === 0 ? "active" : "";
            var carouselItem = `<div class="carousel-item ${activeClass}"><div class="row">`;

            chunk.forEach(function (video) {
              var starsHtml = '';
              for (var i = 0; i < 5; i++) {
                if (i < video.star) {
                  starsHtml += '<img src="images/star_on.png" alt="full star">';
                } else {
                  starsHtml += '<img src="images/star_off.png" alt="empty star">';
                }
              }
              var cardItem = `
                <div class="col-md-6 col-lg-3">
                  <div class="card">
                    <img src="${video.thumb_url}" alt="${video.title}">
                    <h3>${video.title}</h3>
                    <p>${video["sub-title"]}</p>
                    <div class="author-info">
                      <img class="author-pic small-circle" src="${video.author_pic_url}" alt="${video.author}">
                      <h6 class="video-author">${video.author}</h6>
                    </div>
                    <div class="star-rating">
                      <div class="stars">${starsHtml}</div>
                      <p class="duration">${video.duration}</p>
                    </div>
                  </div>
                </div>`;
                carouselItem += cardItem;
            });
            carouselItem += `</div></div>`;
            $(".videos .carousel-inner").append(carouselItem);
          });
          $(".videos .carousel").carousel();
        },
        error: function() {
          $(".videos .carousel-inner").html('<div class="text-white">Failed to fetch video cards. Please try again later.</div>');
        }
      });
    }
    fetchQuotes();
    fetchVideoCards();
  });