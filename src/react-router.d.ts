// react-router.d.ts
import 'react-router-dom';

declare module 'react-router-dom' {
    export interface Location {
        state?: { from?: Location };
    }
}
