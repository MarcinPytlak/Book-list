{
  'use strict';
  const select = {
    templateOf: {
      menuBooks: '#template-book',
    },
    containerOf: {
      menuList: '.books-list',
      filters: '.filters'
    },
    menusBooks: {
      bookImage: '.book__image',
      books: '.books-panel',
      bookRating: '.book__rating__fill',
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
  class BooksList {
    constructor() {
      const thisBook = this;
      thisBook.favoriteBooks =[];
      thisBook.filters = [];
      thisBook.render();
      thisBook.initActions();
    }

    render() {
      const thisBook = this;
      this.data = dataSource.books;
      for(let book in this.data){
        let bookId = this.data[book];
        const bookRating = thisBook.determineRatingBgc(bookId.rating);
        const ratingBgc = bookRating[0];
        const ratingWidth = bookRating[1];
        bookId = {...bookId, ratingBgc: ratingBgc, ratingWidth: ratingWidth};
        const generatedHTML = templates.menuBooks(bookId);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const menuContainer = document.querySelector(select.containerOf.menuList);
        menuContainer.appendChild(generatedDOM);
      }
    }

    initActions() {
      const thisBook = this;
      document.querySelector(select.containerOf.menuList).addEventListener('dblclick', (event) => {
        let imageId = event.path[2].getAttribute('data-id');
        if (thisBook.favoriteBooks.includes(imageId)) {
          let removeValue = thisBook.favoriteBooks.indexOf(imageId);
          event.path[2].classList.remove(classNames.menuBooks.imageFavorite);
          thisBook.favoriteBooks.splice(removeValue, 1);
        } else {
          event.path[2].classList.add(classNames.menuBooks.imageFavorite);
          thisBook.favoriteBooks.push(imageId);
        }
      });
      document.querySelector(select.containerOf.filters).addEventListener('click', function(event){
        if(event.target.name =='filter' && event.target.tagName =='INPUT' && event.target.type == 'checkbox'){
          if(event.target.checked == true){
            thisBook.filters.push(event.target.value);
          }else{
            let removedValue = thisBook.filters.indexOf(event.target.value);
            thisBook.filters.splice(removedValue, 1);
          }
        }
      
        thisBook.filterBooks();
      });
    }

    filterBooks() {
      const thisBook = this;

      //const thisBooks = dataSource.books;
      for(const book of this.data){
        let shouldBeHidden = false;
        for(const element of thisBook.filters){
          if(!book.details[element]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden == true){
          const img = document.querySelector(`[data-id='${book.id}']`);
          img.classList.add('hidden');
        } else {
          const img = document.querySelector(`[data-id='${book.id}']`);
          img.classList.remove('hidden');
        }
      }
    }
  determineRatingBgc(rating){
      const thisBook = this;
      let backgroundColor = '';
      let bookWidth = rating *10;
      if(rating<6){
        backgroundColor = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }else if(rating>6 && rating <=8){
        backgroundColor = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if(rating >8 && rating <=9){
        backgroundColor = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }else if(rating >9){
        backgroundColor = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return [backgroundColor, bookWidth] ;
    }

  }

  const app = new BooksList();
}