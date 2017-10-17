class bc:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def headmain():
	print  bc.FAIL + '''

         aaa    ---                                                       
         c--    ---                                                       
         c--    ---                  aaaaa                    ''' +bc.HEADER+ '''            
         c--    ---                   cc--          -                     
         c--    ---                    cc--        -                      
         c--    ---                     cc--     --            ''' +bc.OKGREEN+ '''UNIX Like             
         c--    ---                      cc--   --             ALTERNATIVE NAVEGATION 
         c--    ---   aaa      --   aaa   cc-----              Designed for CLOUD connections                        
         c--    ---   c----    --   c--    cc--                           
         c--    ---   c--c--   --   c--     cc--               ''' +bc.OKBLUE+ '''         
         c--    ---   c--cc--  --   c--   -cccc--                         
         c--    ---   c-- ccc- --   c--  -cc  cc-                         
         c---------   c--   cc---   c-- -cc    cc--              
         cccccccccc   ccc    cccc   c---cc      cc-            ''' +bc.WARNING+ '''             
                                    c-ccc        cc--                     
                                    -cc           cc--                    
                                  cccc             cc-         by:APeris                    
                                                                  ''' +bc.OKGREEN+ '''        
                                                                          
	'''+bc.ENDC
	asd = raw_input("Start System: ")