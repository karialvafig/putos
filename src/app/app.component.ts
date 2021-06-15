import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


interface pedido{
  id?: string;
  proveedor: string;
  prenda: string;
  color: string;
  tamano: string;
  cantidad: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sunshine';
  proveedor='';
  prenda='';
  color='';
  tamano='';
  cantidad='';
  pedidos: Array<pedido>=[];
  editando: boolean = false;
  idEditar: string = "";

  constructor(private db: AngularFirestore){
    this.db.collection("pedido").snapshotChanges().subscribe(res =>{
      this.pedidos = res.map(doc =>{
          return{
            id: doc.payload.doc.id,
            ...doc.payload.doc.data() as {}
          } as pedido
        })
      })
    }

    guardar(){
      this.db.collection("pedido").add({
        proveedor: this.proveedor,
        prenda: this.prenda,
        color: this.color,
        tamano: this.tamano,
        cantidad: this.cantidad
      })
      .then(doc=> console.log(doc.id))
      .catch(error => console.log(error))
    }

    eliminar(pedido: pedido){
      console.log(pedido.id);
      this.db.collection("pedido").doc(pedido.id).delete()
    }

    editar(pedido: pedido){
      this.editando = !this.editando;
      this.idEditar = pedido.id || "";
    }

    editarPedido() {
      let documentoEditar = {
        proveedor: this.proveedor,
        prenda: this.prenda,
        color: this.color,
        tamano: this.tamano,
        cantidad: this.cantidad
      }
      this.db.collection("pedido").doc(this.idEditar).set({...documentoEditar}, { merge: true });
    }
  }



