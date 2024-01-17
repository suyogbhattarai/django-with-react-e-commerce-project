import axios from "axios"
import {
  PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_FAIL,PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, 
  PRODUCT_DELETE_FAIL,PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, 
  PRODUCT_CREATE_FAIL,PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_RESET, 
} from "../constants/ProductConstants"


export const listProducts = () => async(dispatch) =>{
 
    try{
        dispatch({type:PRODUCT_LIST_REQUEST});
        const{data}=await axios.get('http://127.0.0.1:8000/api/products/')
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})

        

    } 
    
    catch(error){ 
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            :error.message}

    )}

}

export const listProductDetails = (id) => async(dispatch) =>{
 
    try{
        dispatch({type:PRODUCT_DETAIL_REQUEST});
        const{data}=await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
        dispatch({type:PRODUCT_DETAIL_SUCCESS,payload:data})
        

    } 
    catch(error){ 
        dispatch({type:PRODUCT_DETAIL_FAIL,payload:error.response && error.response.data.message 
            ? error.response.data.message
            :error.message}

    )}

}

export const deleteProduct = (id) =>async (dispatch,getState) => {

    try{
      dispatch({
        type:PRODUCT_DELETE_REQUEST,
      })

      const {
        userLogin:{userInfo},
      }=getState()


      const config={
        headers:{
          'content-type':'application/json',
          Authorization:`Bearer ${userInfo.token}`
        }
      }

      const {data}=await axios.delete(
        `http://127.0.0.1:8000/api/products/delete/${id}`,
        config   

      )
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
        payload:data,
      })
    
      
      

    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
          
      });
    }

      
    }

export const createProduct = () =>async (dispatch,getState) => {

  try{
    dispatch({
      type:PRODUCT_CREATE_REQUEST,
    })

    const {
      userLogin:{userInfo},
    }=getState()


    const config={
      headers:{
        'content-type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const {data}=await axios.post(
      `http://127.0.0.1:8000/api/products/create/`,
      {},
      config   

    )
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload:data,
    })
  
    
    

  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message,
        
    });
  }

    
    }