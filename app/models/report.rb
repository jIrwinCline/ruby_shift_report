class Report < ApplicationRecord
  belongs_to :user
  has_many :entries, dependent: :destroy

  # Could put validates
  # validates :body, presence: true

  def generate_doc
    entries = self.entries
    report = self
    user = User.find(self.user_id)
    
    Caracal::Document.save 'example.docx' do |docx|
      docx.style do 
        id 'header'
        name 'header'
        font 'Times New Roman'
        size '48'
      end
      
      docx.style do 
        id 'body'
        name 'body'
        font 'Times New Roman'
        size '24'
      end
      
      docx.h1 'PORTLAND PROJECT 
      PORTLAND CENTER PLAZA
      THE LINC
      '
      docx.hr
      docx.h1 'SUNDAY, APRIL 12th , 2020'
      docx.page
      entries.each do |entry|
        docx.p entry.body
        docx.p
      end
      
      docx.h2 'Section 1'
      docx.p 'Lorem ipsum dolor....'
      docx.p
    end
    { report: report, entries: entries, user: user}
  end
  
end
