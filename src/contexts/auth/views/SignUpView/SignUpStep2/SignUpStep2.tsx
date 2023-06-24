// react
import { Fragment, memo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
// hooks
import { useSignUpStep2 } from './useSignUpStep2.hook';
// utils
import { classNames } from '@/shared/utils';
// components
import { Button, DraggableMarker, InputField } from '@/shared/components';

const SignUpStep2 = memo(() => {
    const {
        step2FormFields,
        prevAction,
        nextAction,
        translate,
        isStep2CurrentStep,
        currentLocation,
        handlePositionChange,
        wrapperRef,
        isAutoLocate,
    } = useSignUpStep2();

    return (
        <div
            className={classNames('flex-col gap-4', isStep2CurrentStep ? 'flex' : 'hidden lg:flex')}
            ref={wrapperRef}>
            <h3 className="font-semibold text-center">{translate('auth.sign-up.step-2')}</h3>

            <Button {...prevAction} />

            <fieldset className="flex flex-col gap-4">
                {step2FormFields.map((field, index) => (
                    <Fragment key={index}>
                        <InputField {...field} />
                    </Fragment>
                ))}
            </fieldset>

            <MapContainer
                center={[currentLocation.latitude, currentLocation.longitude]}
                zoom={13}
                className="rounded-sm h-48">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="theme-dark:filter theme-dark:brightness-75 theme-dark:contrast-150 theme-dark:hue-rotate-180 theme-dark:invert"
                />

                <DraggableMarker
                    className="text-primary-500"
                    isAutoLocate={isAutoLocate}
                    position={currentLocation}
                    onPositionChange={handlePositionChange}
                />
            </MapContainer>

            <Button {...nextAction} />
        </div>
    );
});

export default SignUpStep2;
