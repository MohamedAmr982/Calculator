package org.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
public class Controller {

    @Autowired
    private Service service;
    private final String path = "/calc";

    @CrossOrigin
    @RequestMapping(
            method = RequestMethod.POST,
            value = path+"/add"
    )
    public String add(@RequestBody HashMap<String, Double> requestBody){
        return this.service.add(requestBody.get("x"), requestBody.get("y"));
    }

    @CrossOrigin
    @RequestMapping(
            method = RequestMethod.POST,
            value = path+"/subtract"
    )
    public String subtract(@RequestBody  HashMap<String, Double> requestBody){
        return this.service.subtract(requestBody.get("x"), requestBody.get("y"));
    }

    @CrossOrigin
    @RequestMapping(
            method = RequestMethod.POST,
            value = path+"/multiply"
    )
    public String multiply(@RequestBody HashMap<String, Double> requestBody){
        return this.service.multiply(requestBody.get("x"), requestBody.get("y"));
    }

    @CrossOrigin
    @RequestMapping(
            method = RequestMethod.POST,
            value = path+"/divide"
    )
    public String divide(@RequestBody HashMap<String, Double> requestBody){
        Double y = requestBody.get("y");
        if(!(y<0) && !(y>0)){
            //JSON.parse("E") gives an error but JSON.parse('"E"') doesn't
            return "\"E\"";
        }
        return this.service.divide(requestBody.get("x"), y);
    }

    @CrossOrigin
    @RequestMapping(
            method = RequestMethod.POST,
            value = path+"/reciprocal"
    )
    public String reciprocal(@RequestBody HashMap<String, Double> requestBody){
        Double x = requestBody.get("x");
        if(!(x<0) && !(x>0)){
            return "\"E\"";
        }
        return this.service.reciprocal(x);
    }

    @CrossOrigin
    @RequestMapping(
            method = RequestMethod.POST,
            value = path+"/sqrt"
    )
    public String sqrt(@RequestBody HashMap<String, Double> requestBody){
        Double x = requestBody.get("x");
        if(x < 0){
            return "\"E\"";
        }
        return this.service.sqrt(x);
    }

    @CrossOrigin
    @RequestMapping(
            method = RequestMethod.POST,
            value = path+"/square"
    )
    public String square(@RequestBody HashMap<String, Double> requestBody){
        return this.service.square(requestBody.get("x"));
    }

    @CrossOrigin
    @RequestMapping(
            method = RequestMethod.POST,
            value = path+"/percent2param"
    )
    public String percent2Param(@RequestBody HashMap<String, Double> requestBody){
        return this.service.percent(requestBody.get("x"), requestBody.get("y"));
    }


    @CrossOrigin
    @RequestMapping(
            method = RequestMethod.POST,
            value = path+"/percent1param"
    )
    public String percent1Param(@RequestBody HashMap<String, Double> requestBody){
        return this.service.percent(requestBody.get("x"));
    }

}
