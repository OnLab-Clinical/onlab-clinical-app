// react
import { Fragment, memo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
// hooks
import { useSignUpStep2 } from './useSignUpStep2.hook';
// utils
import { classNames } from '@/shared/utils';
// components
import { Button, InputField } from '@/shared/components';

const SignUpStep2 = memo(() => {
    const { step2FormFields, prevAction, nextAction, translate, isStep2CurrentStep } =
        useSignUpStep2();

    return (
        <div
            className={classNames(
                'flex-col gap-4',
                isStep2CurrentStep ? 'flex' : 'hidden lg:flex'
            )}>
            <h3 className="font-semibold text-center">{translate('auth.sign-up.step-2')}</h3>

            <Button {...prevAction} />

            <fieldset className="flex flex-col gap-4">
                {step2FormFields.map((field, index) => (
                    <Fragment key={index}>
                        <InputField {...field} />
                    </Fragment>
                ))}
            </fieldset>

            <MapContainer center={[0, 0]} zoom={10} className="rounded-sm">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* <DraggableMarker lat={geolocation.lat} lng={geolocation.lng} getPosition={handleSetGeolocation} /> */}
            </MapContainer>

            <Button {...nextAction} />
        </div>
    );
});

export default SignUpStep2;
