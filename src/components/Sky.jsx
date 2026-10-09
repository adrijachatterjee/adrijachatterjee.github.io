import { lazy, Suspense } from 'react';
import KikiBroom from '../art/KikiBroom';

const Sky3D = lazy(() => import('../three/Sky3D'));

export default function Sky({ night }) {
    return (
        <div className="sky" aria-hidden="true">
            <div className="sky-day" />
            <div className="sky-night" />
            <Suspense fallback={null}><Sky3D night={night} /></Suspense>
            <div className="kiki-fly"><KikiBroom size={130} /></div>
        </div>
    );
}
