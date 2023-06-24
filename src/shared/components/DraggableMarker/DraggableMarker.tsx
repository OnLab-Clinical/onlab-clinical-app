// react
import { memo, useEffect, useMemo, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { Marker, useMapEvents } from 'react-leaflet';
// props
import { DraggableMarkerProps } from './DraggableMarker.props';
// types
import { DivIcon, Marker as MarkerProps } from 'leaflet';
// utils
import { content } from '@/shared/utils';
// components
import { Icon } from '../Icon';
// assets
import { mdiMapMarker } from '@mdi/js';

const DraggableMarker = memo(
    ({
        position,
        onPositionChange,
        isDraggable = true,
        isFlyingTo = true,
        isAutoLocate = false,
        className,
        icon = mdiMapMarker,
        iconSize = [48, 48],
        iconAnchor = [24, 48],
        children,
    }: DraggableMarkerProps) => {
        const markerRef = useRef<MarkerProps>(null);

        const map = useMapEvents({
            locationfound(event) {
                onPositionChange({
                    latitude: event.latlng.lat,
                    longitude: event.latlng.lng,
                });
            },
            ...(isDraggable
                ? {
                      click(event) {
                          onPositionChange({
                              latitude: event.latlng.lat,
                              longitude: event.latlng.lng,
                          });
                      },
                  }
                : {}),
        });

        const eventHandlers = useMemo(
            () => ({
                dragend() {
                    const marker = markerRef.current;

                    if (marker != null) {
                        onPositionChange({
                            latitude: marker.getLatLng().lat,
                            longitude: marker.getLatLng().lng,
                        });
                    }
                },
            }),
            [onPositionChange]
        );

        const customIcon = useMemo(
            () =>
                new DivIcon({
                    html: renderToString(<Icon path={icon} />),
                    iconSize,
                    iconAnchor,
                    className,
                }),
            [className, icon, iconAnchor, iconSize]
        );

        // reactivity
        useEffect(() => {
            if (!isFlyingTo) return;

            map.flyTo({ lat: position.latitude, lng: position.longitude }, map.getZoom());
        }, [isFlyingTo, position, map]);

        useEffect(() => {
            if (!isAutoLocate) return;

            map.locate();
        }, [isAutoLocate, map]);

        return (
            <Marker
                icon={customIcon}
                draggable={isDraggable}
                eventHandlers={eventHandlers}
                position={{ lat: position.latitude, lng: position.longitude }}
                ref={markerRef}>
                {content(children, undefined)}
            </Marker>
        );
    }
);

export default DraggableMarker;
