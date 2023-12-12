function myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

// get all news and show them
let news = window.localStorage.getItem("news");
if(news !== null) {
    news = JSON.parse(news);
    let postWrapper = document.getElementById("post-wrapper");
    let data = "";

    news.forEach(n => {
        data += `<div class="post">
                    <div class="image"> <img src="../picture/${n.file}"></div>
                    <div class="post-info" style="font-size: 14px;">
                    <p> ${n.content}</p>
                    <i class="fa fa-user" style="font-size: 11px;"> ${n.author}  </i>
                    &nbsp;
                    <i class="fa fa-calendar" style="font-size: 11px;"> ${n.date}</i>
                    </div>
                    <button data-toggle="collapse" data-target="#demo1" class="w3-button w3-black w3-margin-bottom">Contact</button>
                    <div id="demo1" class="collapse">
                        Email: ${n.email}
                    </div>
                </div>`;
    })

    postWrapper.innerHTML = data;
}