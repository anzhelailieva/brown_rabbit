$(document).ready(function() {
  fillArticles();
  loadRandomImage(images);
  readMore();
  pagination();
});

//Random images on refresh
let images = ["coffee1", "coffee2", "coffee3", "coffee4", "coffee5", "coffee6"];

function loadRandomImage(img) {
  let randomImage = img[Math.floor(Math.random() * img.length)];
  console.log(randomImage);
  $("header").css({
    "background-image":
      "linear-gradient( rgba(16, 29, 44, 0.5),rgba(16, 29, 44, 0.5)), url(img/" +
      randomImage +
      ".jpg)"
  });
}

// Filling articles dynamically
function fillArticles() {
  let id = 0;
  let description = $(".description");
  for (article of articles) {
    id++;
    let html = `<div class="story" id="story${id}">
    <figure class="story__shape">
      <img src=${article.image} alt="" class="story__img" />
    </figure>
    <div class="story__text">
      <h2 class="heading-secondary story__heading">${article.title}</h2>
      <span class="story__post">Posted:23/1-2011</span>
      <span id="par${id}" class="story__span more">${article.text}
      </span></div></div>`;
    description.append(html);
  }
  description.append(` <div class="pagination-wrapper">
  <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li id="previous-page" class="page-item"><a class="link" href="javascript:void(0)">Previous</a></li>
      </ul>
    </nav>
</div>`);
}

// Read more
function readMore() {
  let showChar = 250; // How many characters are shown by default
  let ellipsestext = "...";
  let moretext = "Show more >";
  let lesstext = "Show less";

  $(".more").each(function() {
    let content = $(this).html();

    if (content.length > showChar) {
      let c = content.substr(0, showChar);
      let h = content.substr(showChar, content.length - showChar);

      let html =
        c +
        '<span class="moreellipses">' +
        ellipsestext +
        '&nbsp;</span><span class="morecontent"><span>' +
        h +
        '</span>&nbsp;&nbsp;<a href="#" class="morelink">' +
        moretext +
        "</a></span>";

      $(this).html(html);
    }
  });

  $(".morelink").click(function() {
    if ($(this).hasClass("less")) {
      $(this).removeClass("less");
      $(this).html(moretext);
    } else {
      $(this).addClass("less");
      $(this).html(lesstext);
    }
    $(this)
      .parent()
      .prev()
      .toggle();
    $(this)
      .prev()
      .toggle();
    return false;
  });
}

// Pagination
function pagination() {
  let numberOfItems = $("#wrapper .story").length;
  let limitPerPage = 3;
  let totalPages = Math.round(numberOfItems / limitPerPage);
  $("#wrapper .story:gt(" + (limitPerPage - 1) + ")").hide();
  $(".pagination").append(
    "<li class='page-item currentPage active'><a class='link' href='javascript:void(0)'>" +
      1 +
      "</a></li>"
  );

  for (let i = 2; i <= totalPages; i++) {
    $(".pagination").append(
      "<li class='currentPage' class='page-item'><a class='link' href='javascript:void(0)'>" +
        i +
        "</a></li>"
    );
  }
  $(".pagination").append(
    "<li id='next-page' class='page-item'><a class='link' href='javascript:void(0)'>Next</a></li>"
  );

  $(".pagination li.currentPage").on("click", function() {
    if ($(this).hasClass("active")) {
      return false;
    } else {
      let currentPage = $(this).index();
      $(".pagination li").removeClass("active");
      $(this).addClass("active");
      $("#wrapper .story").hide();

      let grandTotal = limitPerPage * currentPage;
      for (let i = grandTotal - limitPerPage; i < grandTotal; i++) {
        $("#wrapper .story:eq(" + i + ")").show();
      }
    }
  });

  $("#next-page").on("click", function() {
    let currentPage = $(".pagination li.active").index();
    if (currentPage === totalPages) {
      return false;
    } else {
      currentPage++;
      $(".pagination li").removeClass("active");
      $("#wrapper .story").hide();

      let grandTotal = limitPerPage * currentPage;
      for (let i = grandTotal - limitPerPage; i < grandTotal; i++) {
        $("#wrapper .story:eq(" + i + ")").show();
      }

      $(".pagination li.currentPage:eq(" + (currentPage - 1) + ")").addClass(
        "active"
      );
    }
  });

  $("#previous-page").on("click", function() {
    let currentPage = $(".pagination li.active").index();
    if (currentPage === 1) {
      return false;
    } else {
      currentPage--;
      $(".pagination li").removeClass("active");
      $("#wrapper .story").hide();

      let grandTotal = limitPerPage * currentPage;
      for (let i = grandTotal - limitPerPage; i < grandTotal; i++) {
        $("#wrapper .story:eq(" + i + ")").show();
      }

      $(".pagination li.currentPage:eq(" + (currentPage - 1) + ")").addClass(
        "active"
      );
    }
  });
}

// Searching through the content of the page and highlighting the result
$(function() {
  let mark = function() {
    let keyword = $("input[name='keyword']").val();
    //console.log(keyword);

    // Remove previous marked elements and mark
    // the new keyword inside the context
    $(".description").unmark({
      done: function() {
        $(".description").mark(keyword);
      }
    });
  };

  $("input[name='keyword']").on("input", mark);
});
