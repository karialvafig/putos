import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


interface pedido{
  proveedor: string;
  prenda: string;
  color: string;
  tamaño: string;
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
  tamaño='';
  cantidad='';
  pedidos: Array<pedido>=[];
  editando: boolean=false;
  Actualizar: pedido = {
    proveedor:"",
    prenda:"",
    color:"",
    tamaño:"",
    cantidad:""
  };

  constructor(private db: AngularFirestore){
    this.db.collection("pedido").snapshotChanges().subscribe(res =>{
      this.pedidos=res.map(doc =>{
        return{
          proveedor: doc.payload.doc.id, 
          ...doc.payload.doc.data() as{}
        } as pedido
        })
      })
    }

    guardar(){
      this.db.collection("pedido").add({
        proveedor: this.proveedor,
        prenda: this.prenda,
        color: this.color,
        tamaño: this.tamaño,
        cantidad: this.cantidad
      })
      .then(doc=> console.log(doc.id))
      .catch(error => console.log(error))
    }

    eliminar(pedidos: pedido){
      this.db.collection("pedido").doc(pedidos.proveedor).delete()
    }

    editar(pedidos:pedido){
      this.editando=!this.editar
      this.Actualizar = pedidos;
    }
  }
  


