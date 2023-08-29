package coco.service;

import coco.data.dto.FacilityRequestDto;
import coco.data.dto.FacilityResponseDto;
import coco.data.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FacilityService {

    @Autowired
    private FacilityRepository facilityRepository;

    @Transactional
    public Page<FacilityResponseDto> getFacilitiesByName(String name, Pageable pageable, Authentication authentication) {
        return facilityRepository.findAllByNameContaining(name, pageable).map(FacilityResponseDto::new);
    }
}
