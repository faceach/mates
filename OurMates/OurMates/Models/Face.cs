//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OurMates.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Face
    {
        public string FaceId { get; set; }
        public string PhotoId { get; set; }
        public string PersonId { get; set; }
        public Nullable<int> TopPosition { get; set; }
        public Nullable<int> LeftPosition { get; set; }
        public Nullable<int> Width { get; set; }
        public Nullable<int> Height { get; set; }
        public Nullable<double> Age { get; set; }
        public string Gender { get; set; }
    }
}
