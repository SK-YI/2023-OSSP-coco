package coco.controller.setUpController;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;
import java.net.URISyntaxException;

@Component
public class ApiUtils {

    public String getJsonDataByURL(String uri) {
        try {
            WebClient webClient = WebClient.create();
            return webClient.get()
                    .uri(new URI(uri))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    public JSONArray parsingArray(String jsonData, String arrayName) {
        JSONArray jsonArray = null;
        try {
            JSONParser parser = new JSONParser();
            JSONObject data = (JSONObject)parser.parse(jsonData);
            jsonArray = (JSONArray) data.get(arrayName);
        } catch (ParseException e) {
            System.out.println("parse 변환 실패");
        }
        return jsonArray;
    }
}
