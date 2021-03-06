var Paginador = function(opts) {
    this.defaults = {
        total: 0,
        itens_page: 10,
        container: null,
        item_paginate: null,
        name: "paginador"
    }

    if (opts) {
        /* copy user options or use default values */
        for (var i in this.defaults) {
            this[i] = (opts[i] !== undefined) ? opts[i] : this.defaults[i]
        }
    }

    if (!this.total && this.item_paginate){
        this.total = this.item_paginate.children.length
    }

    if (!this.total){
        this.total = 0;
    }

    if (this.total <= this.itens_page) {
        this.num_pages = 1;
        this.page_end = 1;
    } else {
        this.num_pages = ((this.total%this.itens_page) === 0) ? Math.floor(this.total/this.itens_page) : Math.floor(this.total/this.itens_page) + 1;
        this.page_end = this.num_pages;
    }
    this.page_start = 1;
    this.page_active = 1;

    if (this.item_paginate){
        this.itens = Array.from(this.item_paginate.children);
    } else {
        this.itens = [];
    }

    window[this.name] = this;

    if (this.item_paginate){
        window[this.name].getHTML();
    }
}

Paginador.prototype.getTotal = function() {
    // return the value of total.
    return this.total;
};

Paginador.prototype.getItens_page = function() {
    // return the value of itens_page.
    return this.itens_page;
}
Paginador.prototype.getNum_pages = function() {
    // return the value of num_pages.
    return this.num_pages;
}
Paginador.prototype.getPage_start = function() {
    // return the value of page_start.
    return this.page_start;
}
Paginador.prototype.getPage_end = function() {
    // return the value of page_end.
    return this.page_end;
}
Paginador.prototype.getPage_active = function() {
    // return the value of page_active.
    return this.page_active;
}

Paginador.prototype.getHTML = function() {
    // returns HTML of the paginator.
    html =  "<ul class='box-pagination'>" +
            "<li class='first'>" +
            "<a href='javascript:window[\"" + this.name + "\"].First()'>" +
            "<div class='arrow-left double-arrow'></div>" +
            "</a>" +
            "</li>" +
            "<li class='prev'>" +
            "<a href='javascript:window[\"" + this.name + "\"].Previous()'>" +
            "<div class='arrow-left'></div>" +
            "</a>" +
            "</li>";

    for (var i = 0; i < this.num_pages; i++){
        if ((i + 1) == this.page_active) {
            html += "<li class='page active'><a href='javascript:window[\"" + this.name + "\"].Page(" + (i + 1) + ")'>" + ( i + 1 ) + "</a></li>"
        } else {
            html += "<li class='page'><a href='javascript:window[\"" + this.name + "\"].Page(" + (i + 1) + ")'>" + ( i + 1 ) + "</a></li>"
        }
    }
    
    html += "<li class='next'>" +
            "<a href='javascript:window[\"" + this.name + "\"].Next()'>" +
            "<div class='arrow-right'></div>" +
            "</a>" +
            "</li>" +
            "<li class='last'>" +
            "<a href='javascript:window[\"" + this.name + "\"].Last()'>" +
            "<div class='arrow-right double-arrow'></div>" +
            "</a>" +
            "</li>" +
            "</ul>";

    this.container.innerHTML = html;
}

Paginador.prototype.Last = function() {
    this.page_active = this.page_end;
    this._Display();
    this.getHTML();
}

Paginador.prototype.First = function() {
    this.page_active = this.page_start;
    this._Display();
    this.getHTML();
}

Paginador.prototype.Next = function() {
    this.page_active = this.page_active + 1;

    if (this.page_active > this.page_end) {
        this.page_active = this.page_end;
    }
    this._Display();

    this.getHTML();
}

Paginador.prototype.Previous = function() {
    this.page_active = this.page_active - 1;

    if (this.page_active < this.page_start) {
        this.page_active = this.page_start;
    }
    this._Display();

    this.getHTML();
}

Paginador.prototype.Page = function(p) {
    this.page_active = p;

    if (this.page_active < this.page_start) {
        this.page_active = this.page_start;
    } else if (this.page_active > this.page_end) {
        this.page_active = this.page_end;
    }

    this._Display();

    this.getHTML();
}

Paginador.prototype._Display = function() {
    last_index = ((this.page_active * this.itens_page) > this.total) ? this.total : (this.page_active * this.itens_page);
    first_index = (((this.page_active * this.itens_page) - 12) < 0) ? 0 : ((this.page_active * this.itens_page) - 12);

    elements_to_hide = this.itens.filter(function(e){return e.style.display == ""});
    elements_to_show = this.itens.slice(first_index, last_index)

    for (i = 0; i < elements_to_hide.length; i++){
        elements_to_hide[i].style.display = "none";
    }

    for (i = 0; i < elements_to_show.length; i++){
        elements_to_show[i].style.display = "";
    }
}
