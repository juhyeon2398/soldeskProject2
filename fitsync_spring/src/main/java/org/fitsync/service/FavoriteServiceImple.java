package org.fitsync.service;

import org.fitsync.mapper.FavoriteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class FavoriteServiceImple implements FavoriteService {

	@Autowired
	private FavoriteMapper mapper;
	
}