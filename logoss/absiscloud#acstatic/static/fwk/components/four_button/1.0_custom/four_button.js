$.fn.dataTableExt.oPagination.four_button = {
	    "fnInit": function ( oSettings, nPaging, fnCallbackDraw )
	    {
	        nFirst = document.createElement( 'a' );
	        nPrevious = document.createElement( 'a' );
	        nNext = document.createElement( 'a' );
	        //nLast = document.createElement( 'a' );
	          
	        nFirst.appendChild( document.createTextNode( oSettings.oLanguage.sFirst ) );
	        nPrevious.appendChild( document.createTextNode( oSettings.oLanguage.sPrevious ) );
	        nNext.appendChild( document.createTextNode( oSettings.oLanguage.sNext ) );
	        //nLast.appendChild( document.createTextNode( oSettings.oLanguage.oPaginate.sLast ) );
	          
	        nFirst.className = "paginate_button first";
	        nPrevious.className = "paginate_button previous";
	        nNext.className="paginate_button next";
	        //nLast.className = "paginate_button last";
	        
	        $(nFirst).prepend('<i class="icono-paginador-inicio"></i> ');
	        $(nPrevious).prepend('<i class="icono-paginador-anterior"></i> ');
	        $(nNext).append(' <i class="icono-paginador-siguiente"></i>');
	        
	        nPaging.appendChild( nFirst );
	        nPaging.appendChild( nPrevious );
	        nPaging.appendChild( nNext );
	        //nPaging.appendChild( nLast );
	        
	        
	        $(nFirst).click( function () {
	            oSettings.oApi._fnPageChange( oSettings, "first" );
	            fnCallbackDraw( oSettings );
	        } );
	          
	        $(nPrevious).click( function() {
	            oSettings.oApi._fnPageChange( oSettings, "previous" );
	            fnCallbackDraw( oSettings );
	        } );
	          
	        $(nNext).click( function() {
	            oSettings.oApi._fnPageChange( oSettings, "next" );
	            fnCallbackDraw( oSettings );
	        } );
	          
	        //$(nLast).click( function() {
	        //    oSettings.oApi._fnPageChange( oSettings, "last" );
	        //    fnCallbackDraw( oSettings );
	        //} );
	          
	        /* Disallow text selection */
	        $(nFirst).bind( 'selectstart', function () { return false; } );
	        $(nPrevious).bind( 'selectstart', function () { return false; } );
	        $(nNext).bind( 'selectstart', function () { return false; } );
	        //$(nLast).bind( 'selectstart', function () { return false; } );
	    },
	     
	     
	    "fnUpdate": function ( oSettings, fnCallbackDraw )
	    {
	        if ( !oSettings.aanFeatures.p )
	        {
	            return;
	        }
	          
	        /* Loop over each instance of the pager */
	        var an = oSettings.aanFeatures.p;
	        for ( var i=0, iLen=an.length ; i<iLen ; i++ )
	        {
	            var buttons = an[i].getElementsByTagName('a');
	            if ( oSettings._iDisplayStart === 0 )
	            {
	                buttons[0].className = "paginate_disabled_previous";
	                buttons[1].className = "paginate_disabled_previous";
	            }
	            else
	            {
	                buttons[0].className = "paginate_enabled_previous";
	                buttons[1].className = "paginate_enabled_previous";
	            }
	              
	            if ( oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() )
	            {
	                buttons[2].className = "paginate_disabled_next";
	                //buttons[3].className = "paginate_disabled_next";
	            }
	            else
	            {
	                buttons[2].className = "paginate_enabled_next";
	                //buttons[3].className = "paginate_enabled_next";
	            }
	        }
	    }
	};