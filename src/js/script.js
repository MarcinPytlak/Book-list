{
  'use strict';
  const select = {
    templateOf: {
      menuBooks: '#template-book',
    },
    containerOf: {
      menuList: '.books-list',
    },
    menusBooks: {
      bookImage: '.book__image',
      books: '.books-panel'
    }

  };
  const templates = {
    menuBooks: Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML),
  };
  const classNames = {
    menuBooks: {
      imageFavorite: 'favorite',
    }
  };
  const favoriteBooks = [];
  function render(){
    const thisData = dataSource.books;
    
    for(let book in thisData){
      let bookId = thisData[book];

      const generatedHTML = templates.menuBooks(bookId);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.menuList);
      menuContainer.appendChild(generatedDOM);

    }
  }
  function initActions() {
    /*const imageWrapper = document.querySelector(select.containerOf.menuList)

      .addEventListener('dblclick', function(event){
        if(event.target.classList.contains(select.menusBooks.bookImage)){
          console.log('click');
          event.preventDefault();
          for(let image of imageWrapper){
            let imageId = image.getAttribute('data-id');
            console.log(imageId);
        
            if(favoriteBooks.includes(imageId)){
              let removeValue = favoriteBooks.indexOf(imageId);
              image.classList.remove(classNames.menuBooks.imageFavorite);
              favoriteBooks.splice(removeValue, 1);
            } else{
              image.classList.add(classNames.menuBooks.imageFavorite);
              favoriteBooks.push(imageId);
            }        
          }
        }
      });*/
    const imageWrapper = document.querySelectorAll(select.menusBooks.bookImage);
    console.log(imageWrapper);
    for(let image of imageWrapper){
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        let imageId = image.getAttribute('data-id');
        
        if(favoriteBooks.includes(imageId)){
          let removeValue = favoriteBooks.indexOf(imageId);
          image.classList.remove(classNames.menuBooks.imageFavorite);
          favoriteBooks.splice(removeValue, 1);
        } else{
          image.classList.add(classNames.menuBooks.imageFavorite);
          favoriteBooks.push(imageId);
        }        
      });
    }
  }
  render();
  initActions();
}