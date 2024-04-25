$(window).on("load", function () {
  $(".loader-container").fadeOut(1000);
  $("body").css("overflow","auto")
});

function setSize() {
  var padding =
    $(window).height() -
    ($("#r1").outerHeight() + $("#r2").outerHeight() + $("#r3").outerHeight()) -
    $("#w3").outerHeight() / 2;

  $("#title").css("padding-top", percentage(25, padding));
  $("#title").css("padding-bottom", percentage(35, padding));
  $("#content1").css("padding-top", percentage(15, padding));
  $("#content1").css("padding-bottom", percentage(25, padding));
}
function percentage(percent, total) {
  return Number(((percent / 100) * total).toFixed(2));
}
$(window).on("load", function () {
  setSize();
});

$.getJSON("nivel.json", function (json) {
  window.nivel = json.nivel;
  window.pNivel1 = json.pNivel1;
  window.pNivel2 = json.pNivel2;
  window.pNivel3 = json.pNivel3;
  window.pNivel4 = json.pNivel4;
  window.pNivel5 = json.pNivel5;
  window.pNivel6 = json.pNivel6;
  window.pNivel7 = json.pNivel7;
  window.pNivelWeek =
    (window.pNivel1 +
      window.pNivel2 +
      window.pNivel3 +
      window.pNivel4 +
      window.pNivel5 +
      window.pNivel6 +
      window.pNivel7) /
    7;
  window.NivelMin = json.nivelMin.toFixed(2);
  window.NivelMax = json.nivelMax.toFixed(2);
  window.ErrorMargin = json.errorMargin;

  function updateCard(id, nivel, errorMargin, nivelMin, nivelMax) {
    var week = [
      "Domingo",
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sábado",
    ];
    var date = new Date(new Date().getTime() + id * 24 * 60 * 60 * 1000);
    if (id != 1) {
      $(".PrevCardHeader" + id).text(week[date.getDay()]);
    }
    $(".PrevCardSubHeader" + id).text(date.toLocaleDateString());
    $("#prevLevel" + id).text(
        (nivel + errorMargin).toFixed(2) +
        " m"
    );
    if (nivel + errorMargin <= nivelMin || nivel - errorMargin >= nivelMax) {
      $(".PrevcardTop" + id).css("background-color", "#EE655F");
      console.log(
        "Nivel: " + nivel + " NivelMin: " + nivelMin + " NivelMax: " + nivelMax
      );
    }
  }

  updateCard(
    1,
    window.pNivel1,
    window.ErrorMargin,
    window.NivelMin,
    window.NivelMax
  );
  updateCard(
    2,
    window.pNivel2,
    window.ErrorMargin,
    window.NivelMin,
    window.NivelMax
  );
  updateCard(
    3,
    window.pNivel3,
    window.ErrorMargin,
    window.NivelMin,
    window.NivelMax
  );
  updateCard(
    4,
    window.pNivel4,
    window.ErrorMargin,
    window.NivelMin,
    window.NivelMax
  );
  updateCard(
    5,
    window.pNivel5,
    window.ErrorMargin,
    window.NivelMin,
    window.NivelMax
  );
  updateCard(
    6,
    window.pNivel6,
    window.ErrorMargin,
    window.NivelMin,
    window.NivelMax
  );
  updateCard(
    7,
    window.pNivel7,
    window.ErrorMargin,
    window.NivelMin,
    window.NivelMax
  );

  if (window.nivel >= window.NivelMin && window.nivel <= window.NivelMax) {
    $("#content1").html(
      "O nível do rio é de <span style='color:#79de79;'>" +
        window.nivel +
        " m</span>, estando dentro da faixa normal de " +
        window.NivelMin +
        " a " +
        window.NivelMax +
        " m"
    );
    $("#title").html(
      "O Nível do Rio Doce está <span style='color:#79de79;'>normal</span>"
    );
  } else if (window.nivel < window.NivelMin || window.nivel > window.NivelMax) {
    $("#content1").html(
      "O nível do rio é de <span style='color:#fb6962;'>" +
        window.nivel +
        " m</span>, estando fora da faixa normal de " +
        window.NivelMin +
        " a " +
        window.NivelMax +
        " m"
    );
    $("#title").html(
      "O Nível do Rio Doce está <span style='color:#fb6962;'>anormal</span>"
    );
    if (window.nivel > window.NivelMax) {
      $("#ruler").attr("src", "./rulehigh.svg");
      $("#ruler").css("top", "20%");
      if ($(window).width() <= 576) {
        $("#ruler").css("top", "30%");
      }
    } else if (window.nivel < window.NivelMin) {
      $("#ruler").attr("src", "./rulelow.svg");
      $("#ruler").css("top", "5%");
      if ($(window).width() <= 576) {
        $("#ruler").css("bottom", "280px");
        console.log("sdfsfafasfasdfasdfasfd");
      }
    }
  }
  if (
    window.NivelMin > window.pNivelWeek + window.ErrorMargin ||
    window.NivelMax < window.pNivelWeek - window.ErrorMargin
  ) {
    $("#title2").text("Uma anomalia no nível do rio foi detectada!");

    if (window.NivelMin > window.pNivelWeek + window.ErrorMargin) {
      //previsão abaixo do normal
      $("#content2").text(
        "Vish! Nossa AI previu um possível nível abaixo do normal para os próximos dias, podendo ficar entre: " +
          (window.pNivelWeek - window.ErrorMargin).toFixed(2) +
          " a " +
          window.pNivelWeek.toFixed(2) +
          " m durante toda a semana"
      );
    } else if (window.NivelMax < window.pNivelWeek - window.ErrorMargin) {
      //previsão acima do normal
      $("#content2").text(
        "Vish! Nossa AI previu um possível nível acima do normal para os próximos dias, podendo ficar entre: " +
          window.pNivelWeek.toFixed(2) +
          " a " +
          (window.pNivelWeek + window.ErrorMargin).toFixed(2) +
          " m durante toda a semana"
      );
    }
  }
});
