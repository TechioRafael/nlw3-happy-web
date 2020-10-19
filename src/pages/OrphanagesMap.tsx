import React, { useEffect, useState } from 'react';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../services/api';
import mapIcon from '../utils/mapIcon';

interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}
function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
          setOrphanages(response.data);
        })
      }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Foz do Iguaçu</strong>
                    <span>Paraná</span>
                </footer>
            </aside>
            <Map 
                center={[-25.5286717,-54.5668807]}
                zoom={15}
                style={{width: '100%', height: '100%'}}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />  Tile Layer do openstreetmap */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => {
                    return(
                        <Marker 
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                            key={orphanage.id}
                        >
                            <Popup 
                                closeButton={false}
                                minWidth = {240}
                                maxWidth = {240}
                                className = "map-popup"
                            >
                                {orphanage.name}
                                <Link to={`/orphanage/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF"/>
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })

                }
            </Map>

            <Link to='/orphanage/create' className="create-orphanage">
                <FiPlus size ={32} color="#fff" />
            </Link>
        </div>
    );
}


export default OrphanagesMap;