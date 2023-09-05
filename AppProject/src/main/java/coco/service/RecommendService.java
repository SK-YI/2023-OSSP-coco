package coco.service;

import coco.data.dto.FacilityResponseDto;
import coco.data.entity.User;
import coco.data.repository.FacilityRepository;
import coco.data.repository.FacilityReviewRepository;
import coco.data.repository.UserFavoriteFacilityRepository;
import coco.data.repository.UserRepository;
import coco.data.type.Gender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RecommendService {

    @Autowired
    private FacilityRepository facilityRepository;

    @Autowired
    private UserFavoriteFacilityRepository userFavoriteFacilityRepository;

    @Autowired
    private UserRepository userRepository;


    @Transactional
    public Page<FacilityResponseDto> getRecommendFacilitiesList(Pageable pageable, Authentication authentication) {

        User user = userRepository.findByUsername(authentication.getName());
        String type = user.getUserType();
        int age = user.getAge();

        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            if((age <= 18) && (type == "지체장애")){
                return facilityRepository.findAllByTypeAndEquipmentContaining("특수학교", "승강설비", "주출입구", pageable).map(facility -> new FacilityResponseDto(facility, userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(facility.getFacilityId(), userRepository.findByUsername(authentication.getName()).getUserNumber())));
            }
            else if ((age <= 18) && (type != "지체장애")){
                return facilityRepository.findAllByType("특수학교", pageable).map(facility -> new FacilityResponseDto(facility, userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(facility.getFacilityId(), userRepository.findByUsername(authentication.getName()).getUserNumber())));
            }
            else if((age >= 60) && (type == "지체장애"))
                return facilityRepository.findAllByTypeAndEquipmentContaining("노인복지시설(경로당포함)","병원·치과병원·한방병원·정신병원·요양병원", "승강설비", "주출입구", pageable).map(facility -> new FacilityResponseDto(facility, userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(facility.getFacilityId(), userRepository.findByUsername(authentication.getName()).getUserNumber())));
            else if((age >= 60) && (type != "지체장애"))
                return facilityRepository.findAllByType("노인복지시설(경로당포함)","병원·치과병원·한방병원·정신병원·요양병원", pageable).map(facility -> new FacilityResponseDto(facility, userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(facility.getFacilityId(), userRepository.findByUsername(authentication.getName()).getUserNumber())));
            else
                return facilityRepository.findAll(pageable).map(facility -> new FacilityResponseDto(facility, userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(facility.getFacilityId(), userRepository.findByUsername(authentication.getName()).getUserNumber())));

        }
        return facilityRepository.findAll(pageable).map(FacilityResponseDto::new);
    }
}
