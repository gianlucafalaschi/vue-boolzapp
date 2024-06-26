const { createApp } = Vue;

const dt = luxon.DateTime;

createApp({
    data() {
        return {
            contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                  },
                  {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                  },
                  {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                  },
                  {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                  },
                  {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                  }
                ],
              },
            ], 
            activeUser: 0,
            
            newMessageText: '',

            currentDate: '',

            searchInput: '',

        };
    }, 
    methods: {
      showMessages(index){
        this.activeUser = index;
        console.log(this.activeUser);
      },
      
      addNewMessage(){
        if(this.newMessageText.length > 0) {
          this.currentDate = dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
        //aggiungere un nuovo messaggio all'array
        //Creare un nuovo oggetto con tutte le chiavi
        const newMessage = {
          date: this.currentDate,
          message: this.newMessageText,
          status: 'sent'
        };
        console.log(newMessage);
        // aggiungo il nuovo messaggio a this.contacts[this.activeUser].messages
        this.contacts[this.activeUser].messages.push(newMessage);
        this.newMessageText = '';
        console.log(this.contacts);
        }
      },
      
      messageAnswer(){
        
        
        /* console.log('funzione messageAnswer chiamata'); */
        // aggiungo la nuova risposta a this.contacts[this.activeUser].messages
        setTimeout(() => {
          this.currentDate = dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
          const newAnswer = {
            date: this.currentDate,
            message: 'ok',
            status: 'received',
          };
          this.contacts[this.activeUser].messages.push(newAnswer);
        }, 3000);
         
      },
      filterContacts(){
        // trasformo le lettere inserite dall'utente in minuscole
        this.searchInput = this.searchInput.toLowerCase();
        console.log(this.searchInput);
        // per ogni contatto nell'oggetto contacts prendo il nome e trasformo le lettere in minuscole
        this.contacts.forEach((person, index) => {
          
          let nameLowerCase = person.name.toLowerCase();
          console.log(nameLowerCase);
          // confronto se una stringa ne contiene un'altra, se no -> visible: true diventa false
          let nameIsIncluded = nameLowerCase.includes(this.searchInput,0);
           console.log("nome e' incluso",nameIsIncluded);
           if(nameIsIncluded == true){
                person.visible = true;
                
              }else {
                person.visible = false;
                
              } 
              console.log("variabile visible",person.visible);

      });
      },

    }
}).mount('#app');


// Milestone 1
//- Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) 
//e dall’interlocutore (bianco) assegnando due classi CSS diverse

//- Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare 
//nome e immagine di ogni contatto

//Milestone 2
//- Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i 
//messaggi relativi al contatto attivo all’interno del pannello della conversazione

//- Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
//- Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando 
// “enter” il testo viene aggiunto al thread sopra, come messaggio verde

//- Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente 
//riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4
// - Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono 
//visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> 
// Scrivo “mar” rimangono solo Marco e Martina)

// prendo le lettere dell'input, le rendo tutte minuscole
// le confronto (confronto stringhe "includes?) con tutte le lettere di tutti i contacts.name (anche queste tutte minuscole)

// se le lettere non sono presenti la variabile visible diventa False

// con la variabile visible a Falso il contatto non viene mostrato (uso v-if)