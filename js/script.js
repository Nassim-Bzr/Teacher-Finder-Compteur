const app = {
  //Référence à l'id de la div principale "app"
  el: document.getElementById('app'),

  init () {
    app.state.filteredTeachers = app.state.teachers.filter(teacher => {
      if(app.state.selectedLanguage === 'all') {
        return true;
      }

      return teacher.language === app.state.selectedLanguage;
    });

    app.state.filteredTeachers = app.state.filteredTeachers.filter(teacher => {
      if(app.state.selectedSpe === 'all') {
        return true;
      }

      return teacher.speciality === app.state.selectedSpe;
    });

    app.createForm();
    app.createCounter();
    app.createList();
  },

  state: {
    selectedLanguage: 'all',
    selectedSpe: 'all',

    teachers: [
      {
        name: 'Loris',
        language: 'PHP',
        speciality: 'WordPress',
      },
      {
        name: 'Jean',
        language: 'JavaScript',
        speciality: 'Data',
      },
      {
        name: 'Jean-Christophe',
        language: 'PHP',
        speciality: 'Symfony',
      },
      {
        name: 'Jean-Philippe',
        language: 'PHP',
        speciality: 'Symfony',
      },
      {
        name: 'Julien',
        language: 'PHP',
        speciality: 'React',
      },
      {
        name: 'Vincent',
        language: 'JavaScript',
        speciality: 'React',
      },
      {
        name: 'Tony',
        language: 'JavaScript',
        speciality: 'React',
      },
    ],
    filteredTeachers: []
  },
  createForm() {
    const formEl = app.addElement('form', app.el, {
      className: 'teacher-form'
    });
    
    //Si on passe à un élément via javascript son .className
    //on remplace toutes ses classes
    const selectEl = app.addElement('select', formEl, {
      className: 'teacher-select'
    });
    const languages = [
      {
        value: 'all',
        label: 'Tous les profs'
      },
      {
        value: 'JavaScript',
        label: 'JavaScript'
      },
      {
        value: 'PHP',
        label: 'PHP'
      }
    ];
    /* Pour chacun des languages venant de la variable languages
    j'ajoute une option supplémentaire (avec son nom, et sa valeur) */
    languages.forEach(language => {
      app.addElement('option', selectEl, {
        textContent: language.label,
        value: language.value,
        //La condition "selected" qui définit l'élément sélectionné du select
        //dépend maintenant du state, et sera mise à jour à chaque rendu
        selected: app.state.selectedLanguage === language.value
      })
    });
    selectEl.addEventListener('change', (event) => {
      const selectedLanguage = event.target.value;
      app.state.selectedLanguage = selectedLanguage;
      app.el.innerHTML = '';
      app.init();
    });

    const selectSpeEl = app.addElement('select', formEl, {
      className: 'teacher-select'
    });

    const spes = [
      {
        value: 'all',
        label: 'Toutes les spés'
      },
      {
        value: 'WordPress',
        label: 'WordPress'
      },
      {
        value: 'Symfony',
        label: 'Symfony'
      },
      {
        value: 'React',
        label: 'React'
      },
      {
        value: 'Data',
        label: 'Data'
      },
    ];

    spes.forEach(spe => {
      app.addElement('option', selectSpeEl, {
        textContent: spe.label,
        value: spe.value,
        selected: app.state.selectedSpe === spe.value
      })
    });

    selectSpeEl.addEventListener('change', (event) => {
      const selectedSpe = event.target.value;
      app.state.selectedSpe = selectedSpe;
      app.el.innerHTML = '';
      app.init();
    });
  },

  createCounter() {
    app.addElement('p', app.el, {
      textContent: `${app.state.filteredTeachers.length} profs trouvés`,
      className: 'teacher-counter'
    });
  },
  createList() {
    const teachersListEl = app.addElement('ul', app.el, {
      className: 'teacher-list'
    });
    app.state.filteredTeachers.forEach(teacher => {
      const teacherLiEl = app.addElement('li', teachersListEl, {
        className: 'teacher-list-item'
      });
      app.addElement('span', teacherLiEl, {
        textContent: teacher.name
      });
      app.addElement('span', teacherLiEl, {
        className: 'teacher-tag',
        textContent: teacher.language
      })

      app.addElement('span', teacherLiEl, {
        className: 'teacher-tag',
        textContent: teacher.speciality
      })
    });
  },

  /*
    On se crée une fonction d'ajout d'élément (paramètre "tag")
    Dans un élément parent (paramètre "parent")
    Avec des attributs (paramètre "attributes")
    Ceci simplifie la création de nos éléments en appelant
    app.addElement()
    On donne une valeur par défaut à attributes d'un objet vide.
    Comme ça, si on ne donne pas d'attributs à notre nouvel élément
    on indique à l'éventuel développeur qui utiliserait notre fonction
    que ça n'est pas grave !
  */
  addElement(tag, parent, attributes = {}) {
    const element = document.createElement(tag);
    /*
      Je souhaite à partir d'un objet attributes ressemblant à ça :
      {
        textContent: 'JavaScript',
        value: 'JavaScript',
        selected: true
      }
      Et je souhaite ajouter chacune de ces propriétés à mon element
      element.textContent = 'JavaScript';
      element.value = 'JavaScript';
      element.selected = true;
    */
    for(const key in attributes) {
      element[key] = attributes[key];
    }
    parent.appendChild(element);
    return element;
  },
};
// on initialise l'app dès que le document est prêt
document.addEventListener('DOMContentLoaded', app.init);