let ismobile = false
let courrent_index = 0

const carrousel = document.querySelector(".carrousel")

const btn_prev = document.querySelector(".carrousel_prev")

const btn_next = document.querySelector(".carrousel_next")


const carrousel_item_visible_latop = 4

const carrousel_item_visible_mobile = 2


const carrousel_item_scroll_lapto = 4

const carrousel_item_scroll_mobile = 2


let carrousel_item_scroll = ()=>{
    return ismobile ? carrousel_item_scroll_mobile : carrousel_item_scroll_lapto
}


let carrousel_item_visible = ()=>{
    return ismobile ? carrousel_item_visible_mobile : carrousel_item_visible_latop
}



let resize_witdth_carrousel_and_carrousel_item = ()=>{

    let ratio = carrousel.children.length / carrousel_item_visible()

    carrousel.style.width = (100 * ratio) +'%'

    let childrenlist = [].slice.call(carrousel.children)

    childrenlist.forEach(element => {
        element.style.width = 100 / (carrousel_item_visible() * ratio) + '%'
    });
}


let next = ()=>{
    scroll_v(courrent_index + carrousel_item_scroll())
}


let prev = ()=>{
    scroll_v(courrent_index - carrousel_item_scroll())
}


let scroll_v = (index)=>{

    if(index >=carrousel.children.length || (carrousel.children[courrent_index + carrousel_item_visible()] == undefined && index > courrent_index)){
        index = 0
    }else if(index<0){
        index = carrousel.children.length - carrousel_item_visible()
    }

    if(index == 0){
        btn_prev.classList.add("display_none")
    }else{
        btn_prev.classList.remove("display_none")
    }

    if(index == carrousel.children.length - carrousel_item_visible()){
        btn_next.classList.add("display_none")
    }else{
        btn_next.classList.remove("display_none")
    }

    let translate_x = index *(-100 / carrousel.children.length)
    carrousel.style.transform = 'translate3d(' + translate_x + '%, 0, 0)'
    courrent_index = index
}

window.addEventListener('keydown', e=>{
    if(e.keyCode == 39){
        next()
    }
    if(e.keyCode == 37){
        prev()
    }
})


let rezi_window = ()=>{
    let resize = window.innerWidth <= 1024

    if(resize !==ismobile){
        ismobile = resize
        resize_witdth_carrousel_and_carrousel_item()
    }
}

/*** cette fonction permet de cacher le bouton prev lors du chargement de la page */
let init_scroll = ()=>{
    if(courrent_index===0)
        btn_prev.classList.add("display_none") 
}



/********* main */

carrousel_item_visible()
resize_witdth_carrousel_and_carrousel_item()
btn_next.addEventListener("click",next)
btn_prev.addEventListener('click', prev)
window.addEventListener('resize', rezi_window)
/*** ici j'appel la fonction pour cacher le bouton prev lors du chargement de la page */
init_scroll()

