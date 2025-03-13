import { Routes } from '@angular/router';
import { DraflowComponent } from './draflow/draflow.component';
import { SeamlessFlowComponent } from './seamless-flow/seamless-flow.component';

export const routes: Routes = [
    {
        path: 'edit',
        component: DraflowComponent
    },
    {
        path: 'scroll',
        component: SeamlessFlowComponent
    }
];
