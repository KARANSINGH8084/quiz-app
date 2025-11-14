import { type FC, createContext, useContext, useEffect, useState } from 'react'
import {XCircle } from 'lucide-react'

import "./model.scss";


const defaultValues = {
    window: [],
    title: ''
}

type AddModal = (
    title: string,
    window: any,
    withoutTitle?: boolean,
    withoutCloseIcon?: boolean,
    customClass?: string,
    key?: string
) => void
interface IModalContextValues {
    addModal: AddModal
    clearModal: () => void
    addScroll: () => void
    removeScroll: () => void
    isOpen: boolean
    key: string
}

export const ModalContext = createContext<any>(defaultValues)

export const ModalProvider: FC<{ children?: any }> = ({ children }) => {
    const [state, setState] = useState<any>({
        title: '',
        withoutTitle: false,
        withoutCloseIcon: false,
        window: null,
        customClass: '',
        withScroll: false,
        key: ''
    })

    const addModal: AddModal = (
        title,
        window,
        withoutTitle,
        withoutCloseIcon,
        customClass,
        key = ''
    ) => {
        setState({
            title,
            window,
            withoutTitle,
            withoutCloseIcon,
            customClass,
            key
        })
    }

    const clearModal = () => {
        setState({ title: '', window: null })
    }

    const addScroll = () => {
        setState({ ...state, withScroll: true })
    }
    const removeScroll = () => {
        setState({ ...state, withScroll: false })
    }
    useEffect(() => {
    }, [state]);
    useEffect(() => {
        if (state.window) {
            if (!state.withScroll) {
                document.body.classList.add('modal__scrollblock')
            }
            if (state.withScroll) {
                if (document.body.classList.contains('modal__scrollblock')) {
                    document.body.classList.remove('modal__scrollblock')
                }
            }
        } else {
            document.body.classList.remove('modal__scrollblock')
        }
    }, [state])

    return (
        <ModalContext.Provider
            value={{
                addModal,
                clearModal,
                addScroll,
                removeScroll,
                isOpen: state.window,
                key: state.key
            }}
        >
            <div
                className={`modal modal--${state.window ? 'active' : 'inactive'
                    } ${state.withScroll ? 'modal--withScroll' : ''} ${state.customClass ? state.customClass : ''
                    }`}
                onClick={(e: any) =>
                    e.target === e.currentTarget && clearModal()
                }
            >
                {state.window && (
                    <div
                        className={`modal__card ${state.withoutTitle
                                ? 'modal__card__withoutTitle'
                                : ''
                            }`}
                    >
                        {!state.withoutTitle ? (
                            <h1 className='modal__title'>
                                {state.withoutTitle ? '' : state.title}{' '}
                                {!state.withoutCloseIcon && (
                                    // <img
                                    //     onClick={clearModal}
                                    //     src={Icons.close}
                                    //     alt={('closeModal')}
                                    // />
                                    <div onClick={clearModal}>
                                        <XCircle className="w-6 h-6 cursor-pointer" />
                                    </div>
                                )}
                            </h1>
                        ) : (
                            !state.withoutCloseIcon && (
                                // <img
                                //     className='modal__card__withoutTitle__close'
                                //     onClick={clearModal}
                                //     src={Icons.close}
                                //     alt={('closeModal')}
                                // />
                                <div className='modal__card__withoutTitle__close' onClick={clearModal}>
                                    <XCircle className="w-6 h-6 cursor-pointer" />
                                </div>
                            )
                        )}
                        {state.window}
                    </div>
                )}
            </div>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () =>
    useContext(ModalContext) as IModalContextValues
