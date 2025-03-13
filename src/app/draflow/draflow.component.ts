import { Component } from '@angular/core';
import Drawflow from 'drawflow';

@Component({
  selector: 'app-draflow',
  standalone: true,
  imports: [],
  templateUrl: './draflow.component.html',
  styleUrl: './draflow.component.scss',
})
export class DraflowComponent {
  drawflow: any;
  id: any = null;
  data = { name: '' };
  ngOnInit() {
    this.id = document.getElementById('drawflow');
    this.drawflow = new Drawflow(this.id);
    this.drawflow.start();
    this.addNode('node1', 10, 100);
    this.addNode('node2', 100, 200);
    // this.addLink('node1', 'node2');
    // let label1 = document.querySelector(
    //   '.connection.node_in_node-2.node_out_node-1.output_1.input_1'
    // );

    // this.addLabelText(label1, 'Something');

    const elements = document.getElementsByClassName("drag-drawflow");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("touchend", this.drop, false);
      elements[i].addEventListener("touchmove", this.positionMobile, false);
      elements[i].addEventListener("touchstart", (ev)=> this.onDrag(ev), false);
    }
  }

  export() {
    const exportdata = this.drawflow.export();
    console.log(exportdata);
  }
  mobile_item_selec: any;
  mobile_last_move!: any;

  onDrag(ev: any) {
    console.log("drag", ev);
    if (ev.type === "touchstart") {
      this.mobile_item_selec = ev.target
        .closest(".drag-drawflow")
        .getAttribute("data-node");
    } else {
      ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
    }
  }


  drop(ev: any) {
    
    console.log("drop", ev);
    if (ev.type === "touchend") {
      //@ts-ignore
      let parentdrawflow = document
        .elementFromPoint(
          this.mobile_last_move.touches[0].clientX,
          this.mobile_last_move.touches[0].clientY
        )
        .closest("#drawflow");
      if (parentdrawflow != null) {
        this.addNodeToDrawFlow(
          this.mobile_item_selec,
          this.mobile_last_move.touches[0].clientX,
          this.mobile_last_move.touches[0].clientY
        );
      }
      this.mobile_item_selec = "";
    } else {
      ev.preventDefault();
      let data = ev.dataTransfer.getData("node");
      this.addNodeToDrawFlow(data, ev.clientX, ev.clientY);
    }
  }
  allowDrop(ev: any) {
    ev.preventDefault();
  }
  addNodeToDrawFlow(name: any, pos_x: any, pos_y: any) {
    // if (this.drawflow.editor_mode === "fixed") {
    //   return false;
    // }
    pos_x =
      pos_x *
        (this.drawflow.precanvas.clientWidth /
          (this.drawflow.precanvas.clientWidth * this.drawflow.zoom)) -
      this.drawflow.precanvas.getBoundingClientRect().x *
        (this.drawflow.precanvas.clientWidth /
          (this.drawflow.precanvas.clientWidth * this.drawflow.zoom));
    pos_y =
      pos_y *
        (this.drawflow.precanvas.clientHeight /
          (this.drawflow.precanvas.clientHeight * this.drawflow.zoom)) -
      this.drawflow.precanvas.getBoundingClientRect().y *
        (this.drawflow.precanvas.clientHeight /
          (this.drawflow.precanvas.clientHeight * this.drawflow.zoom));

          let facebook = `
          <div>
            <div class="title-box"><i class="fab fa-facebook"></i> Facebook Message</div>
          </div>
          `;
          this.drawflow.addNode(
            "facebook",
            0,
            1,
            pos_x,
            pos_y,
            "facebook",
            {},
            facebook
          );
  }

  positionMobile(ev: any) {
    this.mobile_last_move = ev;
  }
  addNode(nodeName: any, x: any, y: any) {
    var html = document.createElement('div');
    html.innerHTML = 'Hello Drawflow!!';
    this.drawflow.registerNode('test', html);
    // Use
    this.drawflow.addNode(
      nodeName,
      1,
      1,
      x,
      y,
      'github',
      this.data,
      'test',
      true
    );
  }

  addLink(sourceNodeId: string, targetNodeId: string) {
    this.drawflow.addConnection(sourceNodeId, '', targetNodeId, '');
  }

  addLabelText(bgPath: any, labelText: any) {
    const newid = [bgPath.classList].join().replace(/\s/g, '');
    bgPath.childNodes[0].id = newid;
    let textElem = document.createElementNS(bgPath.namespaceURI, 'text');
    let textElemPath = document.createElementNS(
      bgPath.namespaceURI,
      'textPath'
    );
    textElemPath.setAttribute('href', `#${newid}`);
    textElemPath.setAttribute('text-anchor', 'middle');
    textElemPath.setAttribute('startOffset', '50%');
    textElemPath.classList.add('label-text');
    textElemPath.textContent = labelText;
    textElem.appendChild(textElemPath);
    bgPath.appendChild(textElem);
  }
}
