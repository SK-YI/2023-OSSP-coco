package coco.service;

import coco.data.dto.FacilityRequestDto;
import coco.data.dto.FacilityResponseDto;
import coco.data.dto.LikedResponseDto;
import coco.data.entity.Facility;
import coco.data.entity.UserFavoriteFacility;
import coco.data.repository.FacilityRepository;
import coco.data.repository.UserFavoriteFacilityRepository;
import coco.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FacilityService {

    @Autowired
    private FacilityRepository facilityRepository;

    @Autowired
    private UserFavoriteFacilityRepository userFavoriteFacilityRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Page<FacilityResponseDto> getFacilitiesList(Pageable pageable, Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return facilityRepository.findAll(pageable).map(facility -> new FacilityResponseDto(facility, userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(facility.getFacilityId(), userRepository.findByUsername(authentication.getName()).getUserNumber())));
        }
        return facilityRepository.findAll(pageable).map(FacilityResponseDto::new);
    }

    @Transactional
    public Page<FacilityResponseDto> getFacilitiesByLiked(Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return facilityRepository.findAllByOrderByLikedDesc(pageable).map(facility -> new FacilityResponseDto(facility, userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(facility.getFacilityId(), userRepository.findByUsername(authentication.getName()).getUserNumber())));
        }
        return facilityRepository.findAllByOrderByLikedDesc(pageable).map(FacilityResponseDto::new);
    }

    @Transactional
    public Page<FacilityResponseDto> getFacilitiesByDic(Pageable pageable, Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return facilityRepository.findAllByOrderByName(pageable).map(facility -> new FacilityResponseDto(facility, userFavoriteFacilityRepository.findByFacilityFacilityIdAndUserUserNumber(facility.getFacilityId(), userRepository.findByUsername(authentication.getName()).getUserNumber())));
        }
        return facilityRepository.findAllByOrderByName(pageable).map(FacilityResponseDto::new);
    }

    @Transactional
    public Page<FacilityResponseDto> getFacilitiesByName(String name, Pageable pageable, Authentication authentication) {
        return facilityRepository.findAllByNameContaining(name, pageable).map(FacilityResponseDto::new);
    }

    @Transactional
    public Page<FacilityResponseDto> getFacilitiesByType(String type, Pageable pageable, Authentication authentication){
        return facilityRepository.findAllByType(type, pageable).map(FacilityResponseDto::new);
    }
}
