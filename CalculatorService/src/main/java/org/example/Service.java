package org.example;


import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

@org.springframework.stereotype.Service
public class Service {

    private final int sigDigits = 20;
    public String add(Double x, Double y){
        BigDecimal bigX = BigDecimal.valueOf(x);
        BigDecimal bigY = BigDecimal.valueOf(y);
        BigDecimal sum = bigX.add(bigY);
        return sum.stripTrailingZeros().toString();
    }

    public String subtract(Double x, Double y){
        //returns x-y
        return add(x, -y);
    }

    public String multiply(Double x, Double y){
        BigDecimal bigX = BigDecimal.valueOf(x);
        BigDecimal bigY = BigDecimal.valueOf(y);
        BigDecimal product = bigX.multiply(bigY);
        return product.stripTrailingZeros().toString();
    }

    public String divide(Double x, Double y){
        //returns x/y
        //handling division by zero is in controller
        BigDecimal bigX = BigDecimal.valueOf(x);
        BigDecimal bigY = BigDecimal.valueOf(y);
        BigDecimal quotient = bigX.divide(bigY, sigDigits, RoundingMode.HALF_UP);
        return quotient.stripTrailingZeros().toString();
    }

    public String reciprocal(Double x){
        // returns 1/x as a string
        BigDecimal bigX = BigDecimal.valueOf(x);
        return BigDecimal.valueOf(1.0).divide(bigX, sigDigits, RoundingMode.HALF_UP).stripTrailingZeros().toString();
    }

    public String sqrt(Double x){
        return BigDecimal.valueOf(x).sqrt(new MathContext(sigDigits, RoundingMode.HALF_UP)).stripTrailingZeros().toString();
    }

    public String square(Double x){
        //handling negative numbers in controller
        return multiply(x, x);
    }

    public String percent(Double x, Double y){
        BigDecimal bigX = BigDecimal.valueOf(x);
        BigDecimal bigY = BigDecimal.valueOf(y);
        // y -> y/100
        bigY = bigY.divide(BigDecimal.valueOf(100.0), sigDigits, RoundingMode.HALF_UP);
        // x*y/100
        return bigX.multiply(bigY).stripTrailingZeros().toString();
    }

    public String percent(Double x){
        return BigDecimal.valueOf(x).divide(BigDecimal.valueOf(100.0), sigDigits, RoundingMode.HALF_UP)
                .stripTrailingZeros().toString();
    }

}
