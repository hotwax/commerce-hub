import { GetterTree } from 'vuex'
import RootState from '@/store/RootState'
import UtilState from './UtilState';

const getters: GetterTree <UtilState, RootState> = {
    getShipmentMethod: (state) => (shipmentMethodTypeId: string) => {
        return state.shipmentMethod.length && state.shipmentMethod.find((data: any) => data.shipmentMethodTypeId === shipmentMethodTypeId)?.description
    },
    getGeoName: (state) => (geoId: string) => {
        return state.cached[geoId]
    }
}
export default getters;