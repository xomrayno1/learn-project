package com.tampro.GoodsReceipt.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CommonUtil {
	private static ObjectMapper objectMapper = new ObjectMapper();
	
    public static boolean isValidPattern(String str, String regex) {

        if (regex == null) {
            throw new IllegalArgumentException("Regex pattern must not be null");
        }

        if (!str.isEmpty()) {
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(str);
            return matcher.matches();
        }

        return false;
    }
    public static <T> T jsonToObject(String json, Class<T> type) {
        T target = null;
        try {
            target = objectMapper.readValue(json, type);
        } catch (JsonProcessingException  e) {
            e.printStackTrace();
        }
    
        return target;
    }
    public static <T> T jsonToObject(String json, TypeReference<T> type) {
        T target = null;
        try {
            target = objectMapper.readValue(json, type);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return target;
    }
}
