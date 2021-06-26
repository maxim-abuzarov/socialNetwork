import React, {ComponentType} from 'react'
import Loading from '../components/common/loading/Loading'

export function withSuspense<WCP>(WrappedComponent: ComponentType<WCP>) {
    return (props: WCP) => {
        return (
            <React.Suspense fallback={<Loading />}>
                <WrappedComponent {...props} />
            </React.Suspense>
        )
    }
}
